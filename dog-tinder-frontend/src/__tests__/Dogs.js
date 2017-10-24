import React from 'react';
import ReactDOM from 'react-dom';
import Dogs from '../pages/Dogs';
import { mount } from 'enzyme';

const dogs = [
  {
    id: 1,
    name: 'Morris',
    age: 2,
    enjoys: "Long walks on the beach."
  },
  {
    id: 2,
    name: 'Paws',
    age: 4,
    enjoys: "Snuggling by the fire."
  },
  {
    id: 3,
    name: 'Mr. Meowsalot',
    age: 12,
    enjoys: "Being in charge."
  }
]

it('Dogs renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Dogs dogs={dogs} />, div);
});

it('Renders the dogs', ()=>{
  const component = mount(<Dogs dogs={dogs} />)
  const headings = component.find('h4 > .dog-name')
  expect(headings.length).toBe(3)

})

it('Renders the dogs name', ()=>{
  const component = mount(<Dogs dogs={dogs} />)
  const age = component.find('h4 > .dog-name').first()
  expect(age.text()).toBe("Morris")
})

it('Renders the dog age', ()=>{
  const component = mount(<Dogs dogs={dogs} />)
  const age = component.find('h4 > .dog-age').first()
  expect(age.text()).toBe("2 years old")
})

it('Renders what the dog enjoys', ()=>{
  const component = mount(<Dogs dogs={dogs} />)
  const age = component.find('.dog-enjoys').first()
  expect(age.text()).toBe("Long walks on the beach.")
})
