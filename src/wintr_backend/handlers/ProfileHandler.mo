import Text "mo:base/Text";
import Result "mo:base/Result";
import Char "mo:base/Char";

import Types "./../types/User";
import SocialTypes "./../types/Social";
import ResponseTypes "./../types/Response";
import SocialHandler "./SocialHandler";

module {
    public class ProfileHandler() {
        type Profile = Types.Profile;
        type ApiResponse<T> = ResponseTypes.ApiResponse<T>;

        public func validateUsername(username : Text) : Result.Result<(), Text> {
            let len = username.size();

            // Check length (3-30 characters)
            if (len < 3) {
                return #err("Username must be at least 3 characters long");
            };

            if (len > 30) {
                return #err("Username cannot exceed 30 characters");
            };

            // Check each character
            for (char in username.chars()) {
                if (not isValidUsernameChar(char)) {
                    return #err("Username can only contain lowercase letters, numbers, underscore (_) and hyphen (.)");
                };
            };

            #ok(());
        };

        private func isValidUsernameChar(char : Char) : Bool {
            // Check if character is:
            // - lowercase letter (a-z)
            // - number (0-9)
            // - underscore (_)
            // - hyphen (-)

            switch (char) {
                case ('.') { true };
                case ('_') { true };
                case (c) {
                    if (Char.isDigit(c)) { return true };
                    if (Char.isLowercase(c)) { return true };
                    false;
                };
            };
        };

        private func validateSocials(socials : ?[SocialTypes.Social]) : Bool {
            switch (socials) {
                case (null) { true };
                case (?socialArray) {
                    for (social in socialArray.vals()) {
                        if (not SocialHandler.SocialHandler().isValidPlatform(social.platform)) {
                            return false;
                        };
                    };
                    true;
                };
            };
        };

        public func validateProfile(profile : Profile) : ApiResponse<()> {
            // Validate username
            switch (validateUsername(profile.username)) {
                case (#err(msg)) {
                    return #err(#InvalidInput(msg));
                };
                case (#ok()) {};
            };

            // Validate display name length if provided
            switch (profile.displayName) {
                case (null) {};
                case (?name) {
                    if (name.size() > 50) {
                        return #err(#InvalidInput("Display name cannot exceed 50 characters"));
                    };
                };
            };

            if (not validateSocials(profile.socialLinks)) {
                return #err(
                    #InvalidInput(
                        "Invalid social platform. Use only allowed platforms: " #
                        Text.join(", ", SocialTypes.platforms.vals())
                    )
                );
            };

            // Validate bio length if provided
            switch (profile.bio) {
                case (null) {};
                case (?bio) {
                    if (bio.size() > 500) {
                        return #err(#InvalidInput("Bio cannot exceed 500 characters"));
                    };
                };
            };

            // Add more validation rules as needed

            #ok(());
        };
    };
};
