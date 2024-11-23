module {
    public type ComponentId = Nat;

    public type ComponentGroup = {
        id : ComponentId;
        title : ?Text;
        components : [Component];
    };

    public type Component = {
        id : ComponentId;
        content : Text;
        directUrl : Text;
        componentSize : ?Size;
        backgroundUrl : ?Text;
        prefixUrl : ?Text;
        styling : ?ComponentStyle;
    };

    public type ComponentStyle = {
        backgroundColor : ?Text;
        textColor : ?Text;
        borderColor : ?Text;
        borderRadius : ?Nat;
        prefixRadius : ?Nat;
    };

    public type Size = {
        #normal;
        #medium;
        #big;
    };
};
