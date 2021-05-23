class CommonFunctions {
    static convertElementTypeToElementBit(elementType) {
        switch (elementType) {
            case 1:
            case 2:
                return elementType;
            case 3:
                return 4;
            case 4:
                return 8;
            case 5:
                return 16;
        }
        return 0;
    }

    static convertTargetTypeToTypeBit(targetType) {
        switch (targetType) {
            case 1:
            case 2:
                return targetType;
            case 3:
                return 4;
            case 4:
                return 8;
        }
        return 0;
    }

    static round89(value) {
        let integerValue = Math.floor(value);
        let decimalValue = value - integerValue;
        if(Math.floor(decimalValue * 10) <= 8) {
            return integerValue;
        }
        return (integerValue + 1);
    }
}
export default CommonFunctions;