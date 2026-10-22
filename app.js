
function TShirt (props) {
    const shirt = props.shirt
    const [quantity, setQuantity] = React.useState(1)
  
    const quantities = []
    for (let i = 1; i <= shirt.stock; i++) {
      quantities.push(i)
    }
  
    function changeHandler (event) {
      setQuantity(Number(event.target.value))
    }
  
    function clickHandler () {
      props.onBuy(props.index, quantity)
      setQuantity(1)
    }
  
    return (
      <div className="shirt">
        <img src={'images/' + shirt.image} alt={shirt.title} />
        <h2>{shirt.title}</h2>
        <p className="price">${shirt.price.toFixed(2)}</p>
        <p>Remaining stock: {shirt.stock}</p>
        {shirt.stock > 0 ? (
          <div>
            <label htmlFor={'quantity-' + props.index}>Quantity: </label>
            <select
              id={'quantity-' + props.index}
              value={quantity}
              onChange={changeHandler}
            >
              {quantities.map(number => (
                <option key={number} value={number}>{number}</option>
              ))}
            </select>
            <button onClick={clickHandler}>Buy</button>
          </div>
        ) : (
          <p className="sold-out">Out of Stock</p>
        )}
      </div>
    )
  }
  
  function App () {
    const [items, setItems] = React.useState(tshirts)
  
    function onBuyHandler (index, quantity) {
      setItems(prevState => prevState.map((shirt, i) =>
        i === index
          ? { ...shirt, stock: shirt.stock - quantity }
          : shirt
      ))
    }
  
    return (
      <main>
        <h1>T-Shirts Store</h1>
        <div className="products">
          {items.map((shirt, index) => (
            <TShirt
              key={index}
              index={index}
              shirt={shirt}
              onBuy={onBuyHandler}
            />
          ))}
        </div>
      </main>
    )
  }
  
  const root = ReactDOM.createRoot(document.getElementById('root'))
  root.render(<App />)
  