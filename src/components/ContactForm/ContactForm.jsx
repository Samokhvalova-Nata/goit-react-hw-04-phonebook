import PropTypes from 'prop-types';
import { FormStyled, Label, Input, Error, Button } from './ContactForm.styled';
import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';

const schema = yup.object().shape({
    name: yup.string().required(),
    number: yup.string().required().min(9),
})

const initialValues = {
    name: '',
    number: ''
};

export const ContactForm = ({ onSubmit}) =>  {
    const handleSubmit = (values, {resetForm}) => {
        console.log('Form', values);
        onSubmit({ ...values });
        resetForm();
    };

        return (
            <Formik 
                initialValues={initialValues} 
                onSubmit={handleSubmit}
                validationSchema={schema}>
                <FormStyled >
                    <Label htmlFor='name'>Name</Label>
                    <Input type="text" name="name" />
                    <ErrorMessage component={Error} name="name" />

                    <Label htmlFor='number'>Number</Label>
                    <Input type="tel" name="number" />
                    <ErrorMessage component={Error} name="number"/>
                    <Button type="submit">Add contact</Button>
                </FormStyled>
            </Formik>

        );
};

ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}
