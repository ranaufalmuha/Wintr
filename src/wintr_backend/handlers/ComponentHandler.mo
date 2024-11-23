import Array "mo:base/Array";
import Nat "mo:base/Nat";
import Buffer "mo:base/Buffer";

import ComponentTypes "./../types/Component";
import ResponseTypes "./../types/Response";

module {
    public class ComponentHandler() {
        type Component = ComponentTypes.Component;
        type ApiResponse<T> = ResponseTypes.ApiResponse<T>;

        public func addComponent(
            components : ?[Component],
            newComponent : Component,
        ) : [Component] {
            let currentComponents = switch (components) {
                case null { [] };
                case (?existing) { existing };
            };

            let newId = switch (Array.size(currentComponents)) {
                case 0 { 0 };
                case (n) { n };
            };

            let finalComponent = {
                newComponent with
                id = newId;
            };

            Array.append(currentComponents, [finalComponent]);
        };

        public func reorderComponent(
            components : [Component],
            fromId : Nat,
            toId : Nat,
        ) : [Component] {
            let buffer = Buffer.Buffer<Component>(components.size());

            for (component in components.vals()) {
                buffer.add(component);
            };

            if (fromId >= buffer.size() or toId >= buffer.size()) {
                return components;
            };

            let movingComponent = buffer.remove(fromId);
            buffer.insert(toId, movingComponent);

            let result = Array.tabulate<Component>(
                buffer.size(),
                func(i : Nat) : Component {
                    let component = buffer.get(i);
                    {
                        component with
                        id = i;
                    };
                },
            );

            result;
        };

        public func removeComponent(
            components : [Component],
            id : Nat,
        ) : [Component] {
            let buffer = Buffer.Buffer<Component>(components.size());

            for (component in components.vals()) {
                if (component.id != id) {
                    buffer.add(component);
                };
            };

            let result = Array.tabulate<Component>(
                buffer.size(),
                func(i : Nat) : Component {
                    let component = buffer.get(i);
                    {
                        component with
                        id = i;
                    };
                },
            );

            result;
        };

        public func updateComponent(
            components : [Component],
            id : Nat,
            updatedComponent : Component,
        ) : [Component] {
            Array.map<Component, Component>(
                components,
                func(component : Component) : Component {
                    if (component.id == id) {
                        {
                            updatedComponent with
                            id = component.id;
                        };
                    } else {
                        component;
                    };
                },
            );
        };
    };
};
