import React, { Component } from "react";
import { reduxForm, Field, submit } from "redux-form";

class SurveyForm extends Component {
    render(){
        return (
            <div onSubmit={this.props.handleSubmit(values => console.log(values))}>
                <form>
                    <Field 
                        type="text"
                        name="surveyTitle"
                        component="input"
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default reduxForm({
    form: 'surveyForm'
})(SurveyForm);