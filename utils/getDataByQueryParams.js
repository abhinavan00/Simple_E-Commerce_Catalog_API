export function getDataByQueryParams(catalog, queryObj) {
    const { category, maxPrice, inStock } = queryObj

    if(category) {
        catalog = catalog.filter(product => 
            product.category === category.toLowerCase()
        )
    }

    if(maxPrice) {
        catalog = catalog.filter(product => 
            product.price <= Number(maxPrice)
        )
    }

    if(inStock) {
        catalog = catalog.filter(product => 
            product.inStock === JSON.parse(inStock.toLowerCase())
        )
    }

    return catalog
}