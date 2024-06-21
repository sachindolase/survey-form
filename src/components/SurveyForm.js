import React, { useState, useEffect } from 'react';
import useForm from '../hooks/useForm';
import { fetchAdditionalQuestions } from '../services/api';
import '../styles/SurveyForm.css';

const validate = (values) => {
  const errors = {};
  if (!values.fullName) {
    errors.fullName = 'Full Name is required';
  }
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email is invalid';
  }
  if (!values.surveyTopic) {
    errors.surveyTopic = 'Survey Topic is required';
  }
  if (values.surveyTopic === 'Technology') {
    if (!values.favoriteLanguage) {
      errors.favoriteLanguage = 'Favorite Programming Language is required';
    }
    if (!values.experience) {
      errors.experience = 'Years of Experience is required';
    } else if (isNaN(values.experience) || values.experience <= 0) {
      errors.experience = 'Years of Experience must be a number greater than 0';
    }
  }
  if (values.surveyTopic === 'Health') {
    if (!values.exerciseFrequency) {
      errors.exerciseFrequency = 'Exercise Frequency is required';
    }
    if (!values.dietPreference) {
      errors.dietPreference = 'Diet Preference is required';
    }
  }
  if (values.surveyTopic === 'Education') {
    if (!values.qualification) {
      errors.qualification = 'Highest Qualification is required';
    }
    if (!values.fieldOfStudy) {
      errors.fieldOfStudy = 'Field of Study is required';
    }
  }
  if (!values.feedback) {
    errors.feedback = 'Feedback is required';
  } else if (values.feedback.length < 50) {
    errors.feedback = 'Feedback must be at least 50 characters';
  }

  return errors;
};

const SurveyForm = () => {
  const [additionalQuestions, setAdditionalQuestions] = useState([]);

  const initialValues = {
    fullName: '',
    email: '',
    surveyTopic: '',
    favoriteLanguage: '',
    experience: '',
    exerciseFrequency: '',
    dietPreference: '',
    qualification: '',
    fieldOfStudy: '',
    feedback: '',
  };

  const { values, errors, handleChange, handleSubmit } = useForm(
    initialValues,
    validate
  );

  useEffect(() => {
    if (values.surveyTopic) {
      const fetchQuestions = async () => {
        const questions = await fetchAdditionalQuestions(values.surveyTopic);
        setAdditionalQuestions(questions);
      };
      fetchQuestions();
    } else {
      setAdditionalQuestions([]);
    }
  }, [values.surveyTopic]);

  const onSubmit = () => {
    alert(`Form Submitted:\n${JSON.stringify(values, null, 2)}`);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e, onSubmit)} className="form">
      <div>
        <label>Full Name</label>
        <input
          type="text"
          name="fullName"
          value={values.fullName}
          onChange={handleChange}
        />
        {errors.fullName && <p className="error">{errors.fullName}</p>}
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>
      <div>
        <label>Survey Topic</label>
        <select name="surveyTopic" value={values.surveyTopic} onChange={handleChange}>
          <option value="">Select Topic</option>
          <option value="Technology">Technology</option>
          <option value="Health">Health</option>
          <option value="Education">Education</option>
        </select>
        {errors.surveyTopic && <p className="error">{errors.surveyTopic}</p>}
      </div>
      {values.surveyTopic === 'Technology' && (
        <>
          <div>
            <label>Favorite Programming Language</label>
            <select
              name="favoriteLanguage"
              value={values.favoriteLanguage}
              onChange={handleChange}
            >
              <option value="">Select Language</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Python">Python</option>
              <option value="Java">Java</option>
              <option value="C#">C#</option>
            </select>
            {errors.favoriteLanguage && <p className="error">{errors.favoriteLanguage}</p>}
          </div>
          <div>
            <label>Years of Experience</label>
            <input
              type="number"
              name="experience"
              value={values.experience}
              onChange={handleChange}
            />
            {errors.experience && <p className="error">{errors.experience}</p>}
          </div>
        </>
      )}
      {values.surveyTopic === 'Health' && (
        <>
          <div>
            <label>Exercise Frequency</label>
            <select
              name="exerciseFrequency"
              value={values.exerciseFrequency}
              onChange={handleChange}
            >
              <option value="">Select Frequency</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Rarely">Rarely</option>
            </select>
            {errors.exerciseFrequency && <p className="error">{errors.exerciseFrequency}</p>}
          </div>
          <div>
            <label>Diet Preference</label>
            <select
              name="dietPreference"
              value={values.dietPreference}
              onChange={handleChange}
            >
              <option value="">Select Preference</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Vegan">Vegan</option>
              <option value="Non-Vegetarian">Non-Vegetarian</option>
            </select>
            {errors.dietPreference && <p className="error">{errors.dietPreference}</p>}
          </div>
        </>
      )}
      {values.surveyTopic === 'Education' && (
        <>
          <div>
            <label>Highest Qualification</label>
            <select
              name="qualification"
              value={values.qualification}
              onChange={handleChange}
            >
              <option value="">Select Qualification</option>
              <option value="High School">High School</option>
              <option value="Bachelor's">Bachelor's</option>
              <option value="Master's">Master's</option>
              <option value="PhD">PhD</option>
            </select>
            {errors.qualification && <p className="error">{errors.qualification}</p>}
          </div>
          <div>
            <label>Field of Study</label>
            <input
              type="text"
              name="fieldOfStudy"
              value={values.fieldOfStudy}
              onChange={handleChange}
            />
            {errors.fieldOfStudy && <p className="error">{errors.fieldOfStudy}</p>}
          </div>
        </>
      )}
      <div>
        <label>Feedback</label>
        <textarea
          name="feedback"
          value={values.feedback}
          onChange={handleChange}
        ></textarea>
        {errors.feedback && <p className="error">{errors.feedback}</p>}
      </div>
      <button type="submit">Submit</button>
      <div>
        <h3>Additional Questions:</h3>
        {additionalQuestions.map((question, index) => (
          <div key={index}>
            <label>{question}</label>
            <input type="text" />
          </div>
        ))}
      </div>
    </form>
  );
};

export default SurveyForm;
