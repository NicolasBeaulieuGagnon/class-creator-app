import React, { useState } from "react";
import {
  Wrapper,
  Title,
  Border,
  Form,
  Label,
  Input,
  TextInput,
  SubmitButton,
  InputWrapper,
  DatePickerWrapper,
  DatePickOutput,
} from "./styles";

import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

const CreateLecture = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const isWeekDay = (date: Date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  const removeWeekendsFromCount = (days: number) => {
    const fullWeeks = Math.floor(days / 7);
    return Math.round(days - 2 * (fullWeeks + (days === 6 ? 1 : 0)));
  };

  const getAmountOfDays = (start: Date, end: Date): number => {
    console.log(start.getDay());
    const amountOfSeconds = (end?.getTime() - start?.getTime()) / 1000;
    const amountOfMinutes = amountOfSeconds / 60;
    const amountOfHours = amountOfMinutes / 60;
    let amountOfDays = amountOfHours / 24;

    switch (`${start.getDay()}-${end.getDay()}`) {
      case "3-1":
        return amountOfDays - 1;
      case "4-1":
        return amountOfDays - 1;
      case "4-2":
        return amountOfDays - 1;
      case "5-1":
        return amountOfDays - 1;
      case "5-2":
        return amountOfDays - 1;
      case "5-3":
        return amountOfDays - 1;
      default:
        break;
    }

    amountOfDays = removeWeekendsFromCount(amountOfDays);
    return amountOfDays + 1;
  };

  const handleCreateLecture = (ev: React.FormEvent<HTMLFormElement>) => {};

  const handleDateChange = (date: Array<Date | null>) => {
    if (date && typeof date === "object") {
      const [start, end] = date;
      setStartDate(start);
      setEndDate(end);
    }
  };

  return (
    <Wrapper>
      <Title>Create Lecture</Title>
      <Border />

      <Form onSubmit={handleCreateLecture}>
        <InputWrapper>
          <Label htmlFor="titleInput">Lecture Title</Label>
          <Input type="text" id="titleInput" name="titleInput" />
        </InputWrapper>

        <InputWrapper>
          <Label htmlFor="descriptionInput">Description</Label>
          <TextInput id="descriptionInput" name="descriptionInput" rows={6} />
        </InputWrapper>
        <DatePickerWrapper>
          <span>
            Dates
            <DatePicker
              selected={startDate}
              onChange={handleDateChange}
              selectsRange
              startDate={startDate}
              endDate={endDate}
              placeholderText="lecture range"
              minDate={new Date()}
              filterDate={isWeekDay}
              monthsShown={2}
              dateFormat="MMMM dd yyyy"
            />
          </span>
        </DatePickerWrapper>
        <DatePickOutput>
          {endDate &&
            startDate &&
            `Your lecture will be available for ${getAmountOfDays(
              startDate,
              endDate
            )} day${getAmountOfDays(startDate, endDate) !== 1 ? "s" : ""} `}
        </DatePickOutput>
        <SubmitButton type="submit">Create</SubmitButton>
      </Form>
    </Wrapper>
  );
};

export default CreateLecture;
