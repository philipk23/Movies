export default class Home extends HTMLElement{
     connectedCallback(){
         console.log('in home component');

         this.innerHTML = 'in home component'
     }
}