import Item from "./Item";
import './Transaction.css'

const Transaction=(props)=>{
  const {items} = props
  return(
    <div>
      <ul className="item-list">
        {items.map((element)=>{
          return <Item {...element} key={element.id}/>
          //return <Item title={element.title} amount={element.amount} key={uuidv4()}/>
        })}
      </ul>
    </div>
  );
}

export default Transaction