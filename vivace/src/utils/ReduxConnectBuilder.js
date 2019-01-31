import {connect} from 'react-redux';

const isDefined = (val) => {
    return typeof val !== 'undefined' && val !== null;
};

const lengthOfArray = (array) =>{
    return isDefined(array) ? array.length : 0;
};
const isEmptyArray = (val) =>{
    return lengthOfArray(val) === 0;
};

export default class ReduxConnectBuilder {
    constructor(Wrapped) {
        this.mapStateToPropsBuilder = {};
        this.actionCreatorBuilder = {};
        this.propsAwareActionCreatorBuilder = {};
        this.build = this.build.bind(this);
        this.addMappingFunction = this.addMappingFunction.bind(this);
        this.addActionCreator = this.addActionCreator.bind(this);
        this.mapping = this.mapping.bind(this);
        this.Component = Wrapped;
    }

    addMappingFunction(key, stateMappingFunction) {
        this.mapStateToPropsBuilder[key] = stateMappingFunction;
        return this;
    }

    addActionCreator(key, actionCreator) {
        this.actionCreatorBuilder[key] = actionCreator;
        return this;
    }

    addPropsAwareActionCreator(key, actionCreator) {
        this.propsAwareActionCreatorBuilder[key] = actionCreator;
        return this;
    }

    mapping(mapStateToProps) {
        if (!this.mappings) {
            this.mappings = [mapStateToProps];
        } else {
            this.mappings.push(mapStateToProps);
        }
        return this;
    }

    build() {
        const mapStateToPropsKeysKeys = Object.keys(this.mapStateToPropsBuilder);
        const mapStateToProps = isEmptyArray(mapStateToPropsKeysKeys) && isEmptyArray(this.mappings) ? undefined :
            (state, props) => {
                const singleMappings = mapStateToPropsKeysKeys.reduce((result, key) => {
                        result[key] = this.mapStateToPropsBuilder[key](state, props);
                        return result;
                    },
                    {}
                );
                if (this.mappings) {
                    return this.mappings.reduce((prev, mapping) => {
                        Object.assign(prev, mapping(state, props));
                        return prev;
                    }, singleMappings);
                }
                return singleMappings;
            };

        const dispatchFunction = (dispatch, ownProps) => {
            const result = {};
            Object.keys(this.actionCreatorBuilder).forEach((actionCreatorKey) => {
                const func = this.actionCreatorBuilder[actionCreatorKey];
                result[actionCreatorKey] = (...args) => {
                    return dispatch(func(...args));
                }
            });

            Object.keys(this.propsAwareActionCreatorBuilder).forEach((actionCreatorKey) => {
                const func = this.propsAwareActionCreatorBuilder[actionCreatorKey];
                result[actionCreatorKey] = (...args) => {
                    const callingWithProps = func(ownProps);
                    return dispatch(callingWithProps.apply(this, args));
                }
            });
            return result;
        };
        return connect(mapStateToProps, dispatchFunction)(this.Component);
    }
}
