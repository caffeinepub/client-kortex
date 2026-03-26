import Text "mo:core/Text";
import Order "mo:core/Order";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import List "mo:core/List";
import Principal "mo:core/Principal";

actor {
  type ContactSubmission = {
    name : Text;
    email : Text;
    message : Text;
  };

  module ContactSubmission {
    public func compare(submission1 : ContactSubmission, submission2 : ContactSubmission) : Order.Order {
      Text.compare(submission1.name, submission2.name);
    };
  };

  type Admin = Principal;
  let admins = List.singleton(Principal.fromText("2vxsx-fae"));

  let submissions = Map.empty<Text, ContactSubmission>();

  func requireAdmin(caller : Principal) {
    if (not admins.contains(caller)) { Runtime.trap("Unauthorized: Only admins can access this feature.") };
  };

  func validateInput(name : Text, email : Text, message : Text) {
    if (name.size() == 0) { Runtime.trap("Contact form failed because the name was empty.") };
    if (email.size() == 0) { Runtime.trap("Contact form failed because the email was empty.") };
    if (message.size() == 0) { Runtime.trap("Contact form failed because the message was empty.") };
  };

  public shared ({ caller }) func submitContactForm(name : Text, email : Text, message : Text) : async () {
    validateInput(name, email, message);
    let submission : ContactSubmission = {
      name;
      email;
      message;
    };
    submissions.add(name, submission);
  };

  public query ({ caller }) func getAllSubmissions() : async [ContactSubmission] {
    requireAdmin(caller);
    submissions.values().toArray().sort();
  };

  public query ({ caller }) func countSubmissions() : async Nat {
    submissions.size();
  };
};
