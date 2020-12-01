import React from 'react';
import { Button, Row, Col } from 'reactstrap';
import { Input, Select } from '@material-ui/core';
import { useForm } from "react-hook-form";
import '../styles/DataForm.css';

const options = [
  { id: '', text: '' },
  { id: 'abv_gt', text: 'ABV greater than the supplied number' },
  { id: 'abv_lt', text: 'ABV less than the supplied number' },
  { id: 'ibu_gt', text: 'IBU greater than the supplied number' },
  { id: 'ibu_lt', text: 'IBU less than the supplied number' },
  { id: 'ebc_gt', text: 'EBC greater than the supplied number' },
  { id: 'ebc_lt', text: 'EBC less than the supplied number' }
]

export default function DataForm({ onSubmit }) {
  const { register, handleSubmit } = useForm();
  return (
    <div>
      <Row noGutters>
        <h3 className='containerHeader'>
          To fetch the data please enter values and click the button...
          </h3>
      </Row>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row noGutters>
          <Col>
            <h4 className='headers'>
              Supplied number:
              </h4>
          </Col>
          <Col>
            <h4 className='headers'>
              {'Find all beers with (select value)'}
            </h4>
          </Col>
        </Row>
        <Row noGutters>
          <Col>
            <Input
              className='input'
              placeholder='Please enter a number'
              type='number'
              inputRef={register}
              name='beer_value'
              inputProps={{
                min: 0,
              }}
            />
          </Col>
          <Col>
            <Select
              native
              className='select'
              inputRef={register}
              inputProps={{
                name: 'beers_property',
              }}
            >
              {options.map((option, index) =>
                <option
                  name={option.id}
                  key={index}
                  value={option.id}
                >
                  {option.text}
                </option>
              )}
            </Select>
          </Col>
        </Row>
        <Row noGutters className='separator'>
          <h5> ---OR--- </h5>
        </Row>
        <Row noGutters>
          <Button
            size="xl"
            color="warning"
            type="submit"
          >
            Click to fetch data
          </Button>
        </Row>
      </form>
    </div>
  )
} 