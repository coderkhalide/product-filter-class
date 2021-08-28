const allProducts = document.querySelector('.products');
const allCategory = document.querySelector('.button_wrapper');


(async () => {
    let products = [];
    let categorys = [];  

    await fetch("https://fakestoreapi.com/products")
        .then(res => res.json())
        .then(res => products = res)

    await fetch("https://fakestoreapi.com/products/categories")
        .then(res => res.json())
        .then(res => categorys = res)

    const loopProduct = (items) => {
        let htmlMarkup = ''
        items.forEach(item => {
            const html = `
                <div class="product_card">
                    <img src="${item.image}" alt="">
                    <h3>${item.title}</h3>
                    <p>${item.category}</p>
                    <span>${item.price}</span>
                </div>
            `
            htmlMarkup += html
        })
        allProducts.innerHTML = htmlMarkup
    }

    loopProduct(products)

    let categoryHtml = ''
    categorys.map(item => {
        const html = `
            <button class="btn">${item}</button>
        `
        categoryHtml += html
    })

    allCategory.innerHTML = categoryHtml


    const filterProducts = (select) => {
        const filtered = products.filter(item => item.category === select)
        loopProduct(filtered)
    }

    const allBtns = document.querySelectorAll('.btn')

    allBtns.forEach(item => {
        item.addEventListener('click', e => {
            filterProducts(item.innerHTML)

            allBtns.forEach(item => {
                item.classList.remove('active')
            })
            item.classList.add('active')
        })
    })

})()
