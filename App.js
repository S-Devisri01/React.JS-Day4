# React.JS-Day4

// src/App.js

import React from 'react';
import { ChakraProvider, Container, Box, FormControl, FormLabel, Input, Select, Checkbox, RadioGroup, Radio, Button, VStack, HStack, Text, FormErrorMessage, useToast } from '@chakra-ui/react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import SelectComponent from 'react-select';
import theme from './theme';  // Import the updated theme

// Validation Schema
const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  mobile: Yup.string().matches(/^[0-9]+$/, 'Must be a number').required('Required'),
  text: Yup.string().required('Required'),
  number: Yup.number().required('Required'),
  multiSelect: Yup.array().min(1, 'Select at least one option').required('Required'),
  selectWithSearch: Yup.string().required('Required'),
  radio: Yup.string().required('Required'),
  checkbox: Yup.boolean().oneOf([true], 'Must accept').required('Required'),
});

// Options for Multi-Select and Select
const subjectOptions = [
  { value: 'Mathematics', label: 'Mathematics' },
  { value: 'Physics', label: 'Physics' },
  { value: 'Chemistry', label: 'Chemistry' },
  { value: 'Biology', label: 'Biology' },
  { value: 'English', label: 'English' },
  { value: 'History', label: 'History' }
];

const App = () => {
  const toast = useToast();

  const handleSubmit = (values, { setSubmitting }) => {
    // Check if there are any validation errors
    const hasErrors = Object.values(validationSchema.validateSync(values, { abortEarly: false }).inner).length > 0;

    if (hasErrors) {
      toast({
        title: "Error",
        description: "Please fix the errors in the form before submitting.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Form Submitted Successfully.",
        description: "You have successfully submitted the form.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }

    setSubmitting(false);
  };

  return (
    <ChakraProvider theme={theme}>
      <Container maxW="container.md" p={4}>
        <Box
          bg="secondary.100"
          p={6}
          borderRadius="md"
          boxShadow="lg"
        >
          <Text fontSize="2xl" mb={4} textAlign="center" color="primary.500">
            Interactive College Form
          </Text>
          <Formik
            initialValues={{
              email: '',
              mobile: '',
              text: '',
              number: '',
              multiSelect: [],
              selectWithSearch: '',
              radio: '',
              checkbox: false,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue, errors, touched, isSubmitting }) => (
              <Form>
                <VStack spacing={4} align="stretch">
                  
                  <FormControl isInvalid={!!(errors.email && touched.email)}>
                    <FormLabel htmlFor="email" color="primary.500">Email</FormLabel>
                    <Field name="email">
                      {({ field }) => (
                        <Input
                          {...field}
                          id="email"
                          placeholder="Enter your email"
                          variant="outline"
                        />
                      )}
                    </Field>
                    <FormErrorMessage>
                      <ErrorMessage name="email" />
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!(errors.mobile && touched.mobile)}>
                    <FormLabel htmlFor="mobile" color="primary.500">Mobile</FormLabel>
                    <Field name="mobile">
                      {({ field }) => (
                        <Input
                          {...field}
                          id="mobile"
                          placeholder="Enter your mobile number"
                          type="tel"
                          variant="outline"
                        />
                      )}
                    </Field>
                    <FormErrorMessage>
                      <ErrorMessage name="mobile" />
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!(errors.text && touched.text)}>
                    <FormLabel htmlFor="text" color="primary.500">Text</FormLabel>
                    <Field name="text">
                      {({ field }) => (
                        <Input
                          {...field}
                          id="text"
                          placeholder="Enter some text"
                          variant="outline"
                        />
                      )}
                    </Field>
                    <FormErrorMessage>
                      <ErrorMessage name="text" />
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!(errors.number && touched.number)}>
                    <FormLabel htmlFor="number" color="primary.500">Number</FormLabel>
                    <Field name="number">
                      {({ field }) => (
                        <Input
                          {...field}
                          id="number"
                          placeholder="Enter a number"
                          type="number"
                          variant="outline"
                        />
                      )}
                    </Field>
                    <FormErrorMessage>
                      <ErrorMessage name="number" />
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!(errors.multiSelect && touched.multiSelect)}>
                    <FormLabel htmlFor="multiSelect" color="primary.500">Multi Select</FormLabel>
                    <Field name="multiSelect">
                      {({ field }) => (
                        <SelectComponent
                          {...field}
                          id="multiSelect"
                          isMulti
                          options={subjectOptions}
                          placeholder="Select subjects"
                          onChange={(selectedOptions) => setFieldValue('multiSelect', selectedOptions ? selectedOptions.map(option => option.value) : [])}
                          value={subjectOptions.filter(option => field.value.includes(option.value))}
                          styles={{
                            control: (provided) => ({
                              ...provided,
                              borderColor: 'primary.300',
                              backgroundColor: 'white',
                            }),
                            menu: (provided) => ({
                              ...provided,
                              zIndex: 9999,
                            }),
                          }}
                        />
                      )}
                    </Field>
                    <FormErrorMessage>
                      <ErrorMessage name="multiSelect" />
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!(errors.selectWithSearch && touched.selectWithSearch)}>
                    <FormLabel htmlFor="selectWithSearch" color="primary.500">Select with Search</FormLabel>
                    <Field name="selectWithSearch">
                      {({ field }) => (
                        <SelectComponent
                          {...field}
                          id="selectWithSearch"
                          options={subjectOptions}
                          placeholder="Select an option"
                          onChange={(option) => setFieldValue('selectWithSearch', option ? option.value : '')}
                          value={subjectOptions.find(option => option.value === field.value)}
                          styles={{
                            control: (provided) => ({
                              ...provided,
                              borderColor: 'primary.300',
                              backgroundColor: 'white',
                            }),
                            menu: (provided) => ({
                              ...provided,
                              zIndex: 9999,
                            }),
                          }}
                        />
                      )}
                    </Field>
                    <FormErrorMessage>
                      <ErrorMessage name="selectWithSearch" />
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!(errors.radio && touched.radio)}>
                    <FormLabel color="primary.500">Radio Options</FormLabel>
                    <Field name="radio">
                      {({ field }) => (
                        <RadioGroup {...field} id="radio">
                          <HStack spacing={4}>
                            <Radio value="option1" colorScheme="blue">
                              Study
                            </Radio>
                            <Radio value="option2" colorScheme="blue">
                              Buddy
                            </Radio>
                          </HStack>
                        </RadioGroup>
                      )}
                    </Field>
                    <FormErrorMessage>
                      <ErrorMessage name="radio" />
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!(errors.checkbox && touched.checkbox)}>
                    <FormControl display="flex" alignItems="center">
                      <Field name="checkbox" type="checkbox">
                        {({ field }) => (
                          <Checkbox
                            {...field}
                            id="checkbox"
                            colorScheme="blue"
                            color="primary.500"
                          >
                            Accept Terms and Conditions
                          </Checkbox>
                        )}
                      </Field>
                      <FormErrorMessage>
                        <ErrorMessage name="checkbox" />
                      </FormErrorMessage>
                    </FormControl>
                  </FormControl>

                  <Button
                    mt={4}
                    colorScheme="blue"
                    isLoading={isSubmitting}
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Submit
                  </Button>
                </VStack>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    </ChakraProvider>
  );
};

export default App;
