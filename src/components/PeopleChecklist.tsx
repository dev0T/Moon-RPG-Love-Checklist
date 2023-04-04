import data from '../data/moon_data.json'
import PeopleChecklistItem from './PeopleChecklistItem'

const PeopleChecklist = () => {
  const { people } = data

  return (
    <div>
      <h2 className="text-center text-3xl">People</h2>
      <div className="bg-black m-4">
        <ul>
          {people.map((person) => (
            <PeopleChecklistItem {...person} key={person.name} />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default PeopleChecklist
