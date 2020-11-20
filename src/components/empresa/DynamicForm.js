import React, { Component } from 'react';

class DynamicForm extends Component {

    state = {};

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log("gds:p:s", nextProps.defaultValues, prevState);

        //let derivedState = {};

        if (
            nextProps.defaultValues &&
            nextProps.defaultValues.id !== prevState.id
        ) {
            //   Object.keys(prevState).forEach(k => {
            //     derivedState[k] = "";
            //   });
            return {
                ...nextProps.defaultValues
            };
        }

        console.log("no state change");
        return null;
    }

    onSubmit = e => {
        e.preventDefault();
        if (this.props.onSubmit) this.props.onSubmit(this.state);
    };

    onChange = (e, key, type = "single") => {
        //console.log(`${key} changed ${e.target.value} type ${type}`);
        if (type === "single") {
            this.setState(
                {
                    [key]: e.target.value
                },
                () => { }
            );
        } else {
            // Array of values (e.g. checkbox): TODO: Optimization needed.
            let found = this.state[key]
                ? this.state[key].find(d => d === e.target.value)
                : false;

            if (found) {
                let data = this.state[key].filter(d => {
                    return d !== found;
                });
                this.setState({
                    [key]: data
                });
            } else {
                console.log("found", key, this.state[key]);
                // this.setState({
                //   [key]: [e.target.value, ...this.state[key]]
                // });
                let others = this.state[key] ? [...this.state[key]] : [];
                this.setState({
                    [key]: [e.target.value, ...others]
                });
            }
        }
    };

    renderForm = () => {
        let model = this.props.model;
        //let defaultValues = this.props.defaultValues;

        let formUI = model.map(m => {
            let key = m.key;
            let type = m.type || "text";
            let props = m.props || {};
            let name = m.name;
            let value = m.value;

            let target = key;
            value = this.state[target] || "";

            let input = (
                <input
                    {...props}
                    className="form-control"
                    type={type}
                    key={key}
                    name={name}
                    value={value}
                    onChange={e => {
                        this.onChange(e, target);
                    }}
                />
            );

            if (type === "radio") {
                input = m.options.map(o => {
                    let checked = o.value === value;
                    return (
                        <React.Fragment key={"fr" + o.key}>
                            <input
                                {...props}
                                className="form-check-input"
                                type={type}
                                key={o.key}
                                name={o.name}
                                checked={checked}
                                value={o.value}
                                onChange={e => {
                                    this.onChange(e, o.name);
                                }}
                            />
                            <label className="form-check-label" key={"ll" + o.key}>{o.label}</label>
                            <br/>
                        </React.Fragment>
                    );
                });
                input = 
                    <div className="form-check">
                        {input}
                    </div>;
            }

            if (type === "select") {
                input = m.options.map(o => {
                    //let checked = o.value == value;
                    //console.log("select: ", o.value, value);
                    return (
                        <option
                            {...props}
                            key={o.key}
                            value={o.value}
                        >
                            {o.value}
                        </option>
                    );
                });

                //console.log("Select default: ", value);
                input = (
                    <select
                        value={value}
                        className="form-control"
                        onChange={e => {
                            this.onChange(e, m.key);
                        }}
                    >
                        <option defaultValue disabled value="">Seleccione</option>
                        {input}
                    </select>
                );
            }

            if (type === "checkbox") {
                input = m.options.map(o => {
                    //let checked = o.value == value;
                    let checked = false;
                    if (value && value.length > 0) {
                        checked = value.indexOf(o.value) > -1 ? true : false;
                    }
                    //console.log("Checkbox: ", checked);
                    return (
                        <React.Fragment key={"cfr" + o.key}>
                            <input
                                {...props}
                                className="form-check-input"
                                type={type}
                                key={o.key}
                                name={o.name}
                                checked={checked}
                                value={o.value}
                                onChange={e => {
                                    this.onChange(e, m.key, "multiple");
                                }}
                            />
                            <label className="form-check-label mr-3" key={"ll" + o.key}>{o.label}</label>
                        </React.Fragment>
                    );
                });

                input = <div className="form-check form-check-inline">{input}</div>;
            }

            if (type === "textArea") {
                let textarea = (
                    <textarea
                        {...props}
                        className="form-control"
                        type={type}
                        key={key}
                        name={name}
                        value={value}
                        rows="4"
                        onChange={e => {
                            this.onChange(e, target);
                        }}
                    />
                );

                input = <div className="form-group">{textarea}</div>;
            }

            return (
                <div key={"g" + key} className="form-group">
                    <label className="form-label" key={"l" + key} htmlFor={key}>
                        {m.label}
                    </label>
                    {input}
                </div>
            );
        });
        return formUI;
    };

    // Botones
    cancel = () => {
        this.props.history.push('/empresa');
    }

    render() {
        return (
            <div className={this.props.className}>
                <form
                    className="dynamic-form"
                    onSubmit={e => {
                        this.onSubmit(e);
                    }}
                >
                    {this.renderForm()}
                    <div className="form-actions">
                        <hr className="mt-4 mb-4"/>
                        <div className="container">
                            <div className="row">
                                <div className="col col-sm-12 col-md-4 col-lg-4 align-items-left">
                                    <button
                                        type="button"
                                        className="btn btn-outline-danger"
                                        onClick={this.cancel}>
                                        Cancelar
                                    </button>
                                </div>
                                <div className="col col-sm-12 col-md-4 col-lg-6">
                                    <button
                                        type="button"
                                        className="btn btn-outline-fundacion float-right"
                                        disabled>
                                        Guardar y Salir
                                    </button>
                                </div>
                                <div className="col col-sm-12 col-md-4 col-lg-2">
                                    <button
                                        type="submit"
                                        value="Submit"
                                        className="btn btn-outline-fundacion float-right">
                                        <span className="ml-1 mr-1">Enviar</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default DynamicForm;