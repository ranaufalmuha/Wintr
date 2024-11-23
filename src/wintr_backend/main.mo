import Text "mo:base/Text";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";

import Types "./types/User";
import SocialTypes "./types/Social";
import ComponentTypes "./types/Component";
import ResponseTypes "./types/Response";

import ProfileHandler "./handlers/ProfileHandler";

// import SocialHandler "./handlers/SocialHandler";
// ================================================================================================================================================================================================================================================================================================================

actor Winter {
  type Profile = Types.Profile;
  type Username = Types.Username;
  type Social = SocialTypes.Social;
  type Component = ComponentTypes.Component;
  type ApiResponse<T> = ResponseTypes.ApiResponse<T>;

  private let profileHandler = ProfileHandler.ProfileHandler();

  // State
  private stable var profiles : [(Username, Profile)] = [];
  private var profilesMap = HashMap.HashMap<Username, Profile>(
    0,
    Text.equal,
    Text.hash,
  );

  // private let socialHandler = SocialHandler.SocialHandler();
  // private let componentHandler = ComponentHandler.ComponentHandler();
  // ================================================================================================================================================================================================================================================================================================================

  // Initialize state from stable storage
  private func loadState() {
    profilesMap := HashMap.fromIter<Username, Profile>(
      profiles.vals(),
      profiles.size(),
      Text.equal,
      Text.hash,
    );
  };

  system func preupgrade() {
    profiles := Iter.toArray(profilesMap.entries());
  };

  system func postupgrade() {
    loadState();
  };

  // Create Profile
  public shared (msg) func createProfile(username : Username) : async ApiResponse<Profile> {

    // Validate profile data
    switch (profileHandler.validateUsername(username)) {
      case (#err(error)) { return #err(#InvalidInput(error)) };
      case (#ok()) {};
    };

    // Check if username already exists
    switch (profilesMap.get(username)) {
      case (?_existing) {
        #err(#AlreadyExists("Username already taken"));
      };
      case (null) {
        let profile : Profile = {
          principalId = msg.caller;
          coverUrl = null;
          profileUrl = null;
          username = username;
          displayName = null;
          bio = null;
          backgroundStyle = null;
          socialLinks = null;
          components = null;
        };
        profilesMap.put(username, profile);
        #ok(profile);
      };
    };
  };

  // Read Profile
  public query func getProfile(username : Username) : async ApiResponse<Profile> {
    switch (profilesMap.get(username)) {
      case (?profile) { #ok(profile) };
      case (null) { #err(#NotFound("Profile not found")) };
    };
  };

  public shared (msg) func hasExistingUsername() : async ?Username {
    for ((username, profile) in profilesMap.entries()) {
      if (Principal.equal(profile.principalId, msg.caller)) {
        return ?username;
      };
    };
    return null;
  };

  // Update Profile
  public shared (msg) func updateProfile(
    username : Username,
    updatedProfile : Profile,
  ) : async ApiResponse<Profile> {

    if (msg.caller != updatedProfile.principalId) {
      return #err(#Unauthorized("Unauthorized"));
    };

    // Validate profile data
    switch (profileHandler.validateProfile(updatedProfile)) {
      case (#err(error)) { return #err(error) };
      case (#ok()) {};
    };

    // Check if username not same and is already existing
    if (username != updatedProfile.username) {
      switch (profilesMap.get(updatedProfile.username)) {
        case (?_existing) {
          return #err(#AlreadyExists("Username already taken"));
        };
        case (null) {};
      };
    };

    switch (profilesMap.get(username)) {
      case (null) { #err(#NotFound("Profile not found")) };
      case (?_existingProfile) {
        profilesMap.put(username, updatedProfile);
        #ok(updatedProfile);
      };
    };
  };

  // Delete Profile
  public shared (msg) func deleteProfile(username : Username) : async ApiResponse<()> {
    switch (profilesMap.get(username)) {
      case (null) { #err(#NotFound("Profile not found")) };
      case (?profile) {
        if (msg.caller != profile.principalId) {
          #err(#Unauthorized("Unauthorized"));
        } else {
          ignore profilesMap.remove(username);
          #ok(());
        };
      };
    };
  };

  // Query (for testing/admin purposes)
  public query func getAllProfiles() : async [Profile] {
    Iter.toArray(profilesMap.vals());
  };

  public query func getAllPlatforms() : async [Text] {
    SocialTypes.platforms;
  };

  // statistics
  // Get total number of users
  public query func getTotalUsers() : async Nat {
    profilesMap.size();
  };

  // Get total active users
  public query func getTotalActiveUsers() : async Nat {
    var activeCount = 0;
    for ((username, profile) in profilesMap.entries()) {
      // You can add additional logic here to check if user is "active"
      // For example, if they have components or social links
      switch (profile.components) {
        case (null) {};
        case (?components) {
          if (components.size() > 0) {
            activeCount += 1;
          };
        };
      };
    };
    activeCount;
  };

};
