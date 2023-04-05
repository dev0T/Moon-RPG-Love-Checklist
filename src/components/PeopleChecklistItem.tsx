import { useChecklistStore } from '../store/checklistStore'
import { ChecklistTypes, LoveRewards } from '../utils/types'
import PersonRewardsItem from './PersonRewardsItem'

interface PeopleChecklistItemProps {
  name: string
  wiki: string
  loveRewards: Array<LoveRewards>
}

const PeopleChecklistItem = ({
  name,
  wiki,
  loveRewards,
}: PeopleChecklistItemProps) => {
  const [people, toggle] = useChecklistStore((state) => [
    state.people,
    state.toggle,
  ])

  const areChilrenChecked = () => {
    const isChecked = ({ id }: LoveRewards) => people.includes(`${name}-${id}`)
    const checkedRewards = loveRewards.filter((reward) => isChecked(reward))
    return checkedRewards.length === loveRewards.length
  }

  const handleParentToggle = () => {
    if (areChilrenChecked()) {
      loveRewards.forEach(({ id, love }) => {
        const itemId = `${name}-${id}`
        toggle(itemId, love, ChecklistTypes.People)
      })
    } else {
      loveRewards.forEach(({ id, love }) => {
        const itemId = `${name}-${id}`
        const isChecked = people.includes(itemId)
        if (!isChecked) {
          toggle(itemId, love, ChecklistTypes.People)
        }
      })
    }
  }

  return (
    <li className="mb-5 last:mb-0">
      <ul>
        <div className="form-control mb-3 w-52">
          <label
            className="label justify-start whitespace-nowrap p-0"
            htmlFor={name}
          >
            <input
              id={`${name}`}
              type="checkbox"
              name="progress"
              data-key={name}
              checked={areChilrenChecked()}
              onChange={handleParentToggle}
              className="checkbox-primary checkbox checkbox-md"
            />
            <span className="label-text ml-4 text-xl">
              <a
                href={wiki}
                target="_blank"
                className="underline decoration-1 underline-offset-2"
              >
                {name}
              </a>
            </span>
          </label>
        </div>
        {loveRewards.map((reward) => (
          <PersonRewardsItem {...reward} personName={name} key={reward.id} />
        ))}
      </ul>
    </li>
  )
}

export default PeopleChecklistItem
