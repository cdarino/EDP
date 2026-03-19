function ProductList({items = [], category = 'Category'}) {

    // products.sort((a, b) => a.name.localeCompare(b.name))
    // products.sort((a, b) => a.calories - b.calories)

    // const loCalProducts = products.filter(product => product.calories <= 100)
    // const highCalProducts = products.filter(product => product.calories > 100)

    const productLi = items.map(product =>
        <li key={product.id}>{product.name}: <b>{product.calories}</b> calories</li>
    )

    return (
    <>
        <h3 className="list-category">{category}</h3>
        <ol className="list-items">{productLi}</ol>
    </>
    )
}

export default ProductList;