import { LightningElement, track } from 'lwc';
import addProduct from '@salesforce/apex/ProductsInventory.addProduct';
import getProducts from '@salesforce/apex/ProductsInventory.getProducts';
import getProductsTotal from '@salesforce/apex/ProductsInventory.getProductsTotal';

export default class InventoryComponent extends LightningElement {
    @track productName = '';
    @track productCategory = '';
    @track totalProducts;
    @track products;
    @track errorMessage;

    handleProductName(event){
        this.productName = event.target.value;
    };

    handleCategoryName(event){
        this.productCategory = event.target.value;
    }


    handleAddProduct(){
        addProduct({ productName: this.productName, category: this.productCategory})
            .then(() => {
                this.errorMessage = null;
                this.refreshProducts();
            })
            .catch(error => {
                this.errorMessage = error.body.message;
            });
    };

    handleRefreshProducts() {
        this.refreshProducts();
    }

    refreshProducts() {
        getProducts()
        .then(result => {
            console.log('Products', result);
            this.products = result;
            return getProductsTotal();
        })
        .then(total => {
            this.totalProducts = total;
        })
        .catch(error => {
            this.errorMessage = error.body.message;
        });
    }

    connectedCallback() {
        this.refreshProducts();
    }

}