import { getProducts } from "../api";
import { hideLoading, parseRequestUrl, showLoading } from "../utils";
// import Rating from '../components/Rating';

import { branddealscreen, categorydeal, prodactt, productscreen } from "../config";





const BrandDealScreen = {

    render: async () => {

        showLoading();


        //Getting Data of all Products from database....
        const { value } = parseRequestUrl();
        const products = await getProducts({ searchKeyword: value });
        if (products.error) {
            return `<div class="error">${products.error}</div>`;
        }

        //  Getting Las value from the URL to filter it
        const urlString = window.location.hash;
        var parts = urlString.split('/');
        var lastSegment = parts.pop() || parts.pop();  // handle potential trailing slash


        //Getting only category that match....
        // function filterByCatogory(item) {
        //     if (item.brand === lastSegment) {
        //         return true;
        //     }
        //     return false;
        // }

        // Getting Selected Brand........................... 
        const request = parseRequestUrl();
        function filterByCatogory(item) {
            if (item.brand === request.id) {
                return true;
            }
            return false;
        }
        const filterByBrand = await products.filter(filterByCatogory);

        //Getting only Deals of Selected Item
        function filterByDeal(item) {
            if (item.offerprice > 0) {
                return true;
            }
            return false;
        }
        const filterByDeals = await filterByBrand.filter(filterByDeal);


        const gettingBrandName = request.id;
        var intoUppercase = gettingBrandName.toUpperCase();



        // Shuffling the items
        filterByDeals.sort(() => Math.random() - 0.5);

        var productName = '';

        hideLoading();
        return `
  <style>
   #crusial {
     display: none;
    }

   #feature {
    display: none;
   }

   #banner{
    display: none;
   }

   #afterfeature {
    display: none;
   }
   #newsletter {
    display: none;
   }
   </style>
   
   



   <div class = "container " >
   <h3 class = "fs-4 fw-bold mt-4 mb-4 w-75">All Deals on ${intoUppercase} more than 20%  OFF </h3>
     <div class="row mt-3">
       <div class="col-md-10">
        <div class="row">
         ${(filterByDeals)
                .map(
                    (product) => `
          
           <div class="col-md-4 mb-2">
           
             <div class="card h-100 mb-4 p-1">
             <a ${productName = (product.name).replaceAll('/', '-')} href="/#/${productscreen}/${(productName).replaceAll(' ', '-')}/${product._id}">
                 <img src="${product.image}" class="card-img-top" alt="${product.name}"></a>
                 <div class="card-body">

                        ${product.offerprice > 0.0
                            ? `SAR <span class="prod-price" style= "color:#f90505;
        text-decoration: line-through;
        font-size: 15px;
        font-weight: 700;
        font-style: italic;">${Math.floor((product.price))}.00</span>
            <span class ="offer-price" style="margin-left: 15px;
            color: rgb(6, 176, 6);
            font-size: 1.1rem;
            font-weight: 700;
            font-style: italic;">${Math.floor((product.offerprice))}.00</span>

            <span  style = 'font-size: 12px; color: rgb(6, 176, 6);  background-color: rgb(235, 255, 235);'> %${Math.floor((product.price - product.offerprice) * 100 / product.price)} Off</span>
            `

                            : `<h1 class= "fs-5 fw-bold"></h1> SAR <span style ="font-size: 1rem;  font-weight: 400; font-style: italic; " class="list-price fw-bold">${Math.floor((product.price))}.00</span>`

                        }
                  <h1 class = "fs-6 fw-bold mt-2" style = "color: black; font-weight: 500; text-transform: capitalize;">${product.brand}</h1>
                  <h3 class="card-text mb-3 fs-6">${product.name.slice(0, 60)}...</h3>
              
                     
                        <a ${productName = (product.name).replaceAll('/', '-')}
                        ${productName = (product.name).replaceAll('"', '')} 
                        href="/#/${productscreen}/${(productName).replaceAll(' ', '-')}/${product._id}" class="btn btn-dark position-absolute bottom-0 start-50 translate-middle-x mb-2"><h3 class = "mt-2"  style= "font-size: 1.1vw;">Add to Cart</h3></a>
                     
                 </div>
             </div>
         </div>   
         
           `  )
                .join('\n')}
       </div>  
     
       </div>
       <div class="col-md-2 bg-secondary p-0">
       <!-- Brand to be displayed -->
       <ul class="navbar-nav me-auto">
       <li class="nav-item " style = 'background-color: #192531;'  >
           <a href="" class="nav-link text-light" style = "Margin-left: 10px;">
               <h1 class = "fs-6">Best deals on Brands</h1>
           </a>
       </li>
           <li class="nav-item " style = "Margin-left: 10px;">
               <a  href="/#/${branddealscreen}/hp" class="nav-link text-light" >
                   Deals on HP
               </a>
           </li>
           <li class="nav-item " style = "Margin-left: 10px;">
               <a href="/#/${branddealscreen}/dell" class="nav-link text-light">
               Deals on Dell
               </a>
           </li>
           <li class="nav-item " style = "Margin-left: 10px;">
               <a href="/#/${branddealscreen}/apple" class="nav-link text-light">
               Deals on Apple
               </a>
           </li>
           <li class="nav-item " style = "Margin-left: 10px;">
               <a href="/#/${branddealscreen}/lenovo" class="nav-link text-light">
               Deals on Lenovo
               </a>
           </li>
           <li class="nav-item" style = "Margin-left: 10px;">
               <a href="/#/${branddealscreen}/asus" class="nav-link text-light">
               Deals on Asus
               </a>
           </li>
           <li class="nav-item " style = "Margin-left: 10px;">
               <a href="/#/${branddealscreen}/benq" class="nav-link text-light">
               Deals on BenQ
               </a>
           </li>
           <li class="nav-item " style = "Margin-left: 10px;">
               <a href="/#/${branddealscreen}/gtab" class="nav-link text-light">
               Deals on G-Tab
               </a>
           </li>
           <li class="nav-item " style = "Margin-left: 10px;">
               <a href="/#/${branddealscreen}/intel" class="nav-link text-light">
               Deals on Intel
               </a>
           </li>
           <li class="nav-item " style = "Margin-left: 10px;">
               <a href="/#/${branddealscreen}/ego" class="nav-link text-light">
               Deals on EGO
               </a>
           </li>
           <li class="nav-item " style = "Margin-left: 10px;">
               <a href="/#/${branddealscreen}/xiaomi" class="nav-link text-light">
               Deals on Xiaomi
               </a>
           </li>
           <li class="nav-item " style = "Margin-left: 10px;">
               <a href="/#/${branddealscreen}/promate" class="nav-link text-light">
               Deals on Promate
               </a>
           </li>
           <li class="nav-item " style = "Margin-left: 10px;">
               <a href="/#/${branddealscreen}/logitech" class="nav-link text-light">
               Deals on Logitech
               </a>
           </li>
           <li class="nav-item " style = "Margin-left: 10px;">
               <a href="/#/${branddealscreen}/venom" class="nav-link text-light">
               Deals on Venom
               </a>
           </li>
           <li class="nav-item " style = "Margin-left: 10px;">
               <a href="/#/${branddealscreen}/gigabyte" class="nav-link text-light">
               Deals on Gigabyte
               </a>
           </li>
           <li class="nav-item " style = "Margin-left: 10px;">
               <a href="/#/${branddealscreen}/tdagger" class="nav-link text-light">
               Deals on T-Dagger
               </a>
           </li>
           <li class="nav-item " style = "Margin-left: 10px;">
               <a href="/#/${branddealscreen}/kingston" class="nav-link text-light">
               Deals on Kingston
               </a>
           </li>
           <li class="nav-item " style = "Margin-left: 10px;">
               <a href="/#/${branddealscreen}/microsoft" class="nav-link text-light">
               Deals on Microsoft
               </a>
           </li>
           <li class="nav-item " style = "Margin-left: 10px;">
               <a href="/#/${branddealscreen}/dlink" class="nav-link text-light">
               Deals on D-Link
               </a>
           </li>
           <li class="nav-item " style = "Margin-left: 10px;">
               <a href="/#/${branddealscreen}/huawei" class="nav-link text-light">
               Deals on Huawei
               </a>
           </li>
           <li class="nav-item " style = "Margin-left: 10px;">
               <a href="/#/${branddealscreen}/apcer" class="nav-link text-light">
               Deals on Apcer
               </a>
           </li>
           <li class="nav-item " style = "Margin-left: 10px;">
               <a href="/#/${branddealscreen}/epson" class="nav-link text-light">
               Deals on Epson
               </a>
           </li>
           <li class="nav-item " style = "Margin-left: 10px;">
               <a href="/#/${branddealscreen}/honeywell" class="nav-link text-light">
               Deals on Honeywell
               </a>
           </li>
           <li class="nav-item " style = "Margin-left: 10px;">
               <a href="/#/${branddealscreen}/canon" class="nav-link text-light">
               Deals on Canon
               </a>
           </li>
           <li class="nav-item " style = "Margin-left: 10px;">
               <a href="/#/${branddealscreen}/taiyo" class="nav-link text-light">
               Deals on Taiyo
               </a>
           </li>
           <li class="nav-item " style = "Margin-left: 10px;">
               <a href="/#/${branddealscreen}/snakebyte" class="nav-link text-light">
               Deals on Snakebyte
               </a>
           </li>
           <li class="nav-item " style = "Margin-left: 10px;">
               <a href="/#/${branddealscreen}/ftttoner" class="nav-link text-light">
               Deals on FTT
               </a>
           </li>
           <li class="nav-item " style = "Margin-left: 10px;">
               <a href="/#/${branddealscreen}/huawei" class="nav-link text-light">
               Deals on Huawei
               </a>
           </li>
           <li class="nav-item " style = "Margin-left: 10px;">
               <a href="/#/${branddealscreen}/viper" class="nav-link text-light">
               Deals on Viper
               </a>
           </li>
           <li class="nav-item " style = "Margin-left: 10px;">
               <a href="/#/${branddealscreen}/optoma" class="nav-link text-light">
               Deals on Optoma
               </a>
           </li>
           <li class="nav-item " style = "Margin-left: 10px;">
               <a href="/#/${branddealscreen}/lg" class="nav-link text-light">
               Deals on LG
               </a>
           </li>
           <li class="nav-item " style = "Margin-left: 10px;">
               <a href="/#/${branddealscreen}/hikvision" class="nav-link text-light">
               Deals on Hikvision
               </a>
           </li>
       </ul>
   
       <!-- Catogaries to be displayed -->
       <div > 
       <ul class="navbar-nav me-auto" >
           <li class="nav-item" style = 'background-color: #192531;' >
               <a href="" class="nav-link text-light" style = "Margin-left: 10px;">
                   <h5 class = "fs-5">10% to 50% OFF</h5>
               </a>
           </li>
           <li class="nav-item " style = "Margin-left: 10px;">
               <a href="/#/${categorydeal}/laptop" class="nav-link text-light">
                   Laptops
               </a>
           </li>
           <li class="nav-item " style = "Margin-left: 10px;">
               <a href="/#/${categorydeal}/pc" class="nav-link text-light">
                   PC & All in One
               </a>
           </li>
           <li class="nav-item " style = "Margin-left: 10px;">
               <a href="/#/${categorydeal}/printer" class="nav-link text-light">
                   Printers
               </a>
           </li>
           <li class="nav-item" style = "Margin-left: 10px;">
               <a href="/#/${categorydeal}/monitor" class="nav-link text-light">
                   LED | Screens | Monitors
               </a>
           </li>
           <li class="nav-item " style = "Margin-left: 10px;">
               <a href="/#/${categorydeal}/projector" class="nav-link text-light">
                   Projectors
               </a>
           </li>
           <li class="nav-item " style = "Margin-left: 10px;">
               <a href="/#/${categorydeal}/headphone" class="nav-link text-light">
                   Wirless Headphones | Earbuds
               </a>
           </li>
          
           <li class="nav-item ">
               <a href="/#/${categorydeal}/tablet" class="nav-link text-light" style = "Margin-left: 10px;">
                   Tablets
               </a>
           </li>
           <li class="nav-item ">
               <a href="/#/${categorydeal}/toner" class="nav-link text-light" style = "Margin-left: 10px;">
                   Toners
               </a>
           </li>
           <li class="nav-item ">
               <a href="/#/${categorydeal}/keyboard_mouse" class="nav-link text-light" style = "Margin-left: 10px;">
                   Wirless Mouse and Keyboards
               </a>
           </li>
           <li class="nav-item ">
               <a href="/#/${categorydeal}/ram" class="nav-link text-light" style = "Margin-left: 10px;">
                   RAM
               </a>
           </li>
           <li class="nav-item ">
               <a href="/#/${categorydeal}/router" class="nav-link text-light" style = "Margin-left: 10px;">
                   Network Switches
               </a>
           </li>
           <li class="nav-item ">
               <a href="/#/${categorydeal}/joystick" class="nav-link text-light" style = "Margin-left: 10px;">
                   Gaming Joystick
               </a>
           </li>
           <li class="nav-item ">
               <a href="/#/viewmore/camera" class="nav-link text-light" style = "Margin-left: 10px;">
                   Indoor Outdoor Camera
               </a>
           </li>
           <li class="nav-item ">
               <a href="/#/${categorydeal}/server" class="nav-link text-light" style = "Margin-left: 10px;">
                   Workstation | Server
               </a>
           </li>
           <li class="nav-item ">
               <a href="/#/${categorydeal}/router" class="nav-link text-light" style = "Margin-left: 10px;">
                   Network Router
               </a>
           </li>
           <li class="nav-item ">
               <a href="/#/${categorydeal}/laptopbag" class="nav-link text-light" style = "Margin-left: 10px;">
                   Laptop Bags
               </a>
           </li>
           <li class="nav-item ">
               <a href="/#/${categorydeal}/powerbank" class="nav-link text-light" style = "Margin-left: 10px;">
                   Powerbank 
               </a>
           </li>
           <li class="nav-item ">
               <a href="/#/${categorydeal}/charger" class="nav-link text-light" style = "Margin-left: 10px;">
                   Laptop Charger | Car Charger
               </a>
           </li>
   
           <li class="nav-item ">
               <a href="/#/${categorydeal}/graphiccard" class="nav-link text-light" style = "Margin-left: 10px;">
                   Graphic Cards | Gaming Cards
               </a>
           </li>
           <li class="nav-item ">
               <a href="/#/${categorydeal}/charger" class="nav-link text-light" style = "Margin-left: 10px;">
                   Mobile Wirless Charger
               </a>
           </li>
           <li class="nav-item ">
               <a href="/#/${categorydeal}/connector" class="nav-link text-light" style = "Margin-left: 10px;">
                   Connector
               </a>
           </li>
   
           <li class="nav-item ">
               <a href="/#/${categorydeal}/dockstation" class="nav-link text-light" style = "Margin-left: 10px;">
                   Laptop Holder | Mobile Holder
               </a>
           </li>
           <li class="nav-item ">
               <a href="/#/${categorydeal}/cpu" class="nav-link text-light" style = "Margin-left: 10px;">
                   Intel CPU
               </a>
           </li>
           <li class="nav-item ">
               <a href="/#/${categorydeal}/attendance_machine" class="nav-link text-light" style = "Margin-left: 10px;">
                   Attendance Machine
               </a>
           </li>
           <li class="nav-item ">
               <a href="/#/${categorydeal}/dockstation" class="nav-link text-light" style = "Margin-left: 10px;">
                   Docking Station
               </a>
           </li>
           <li class="nav-item ">
               <a href="/#/${categorydeal}/chargingcable" class="nav-link text-light" style = "Margin-left: 10px;">
                   Charging Cables
               </a>
           </li>
           <li class="nav-item ">
               <a href="/#/${categorydeal}/powersupply" class="nav-link text-light" style = "Margin-left: 10px;">
                   Power Supply
               </a>
           </li>
           <li class="nav-item ">
               <a href="/#/${categorydeal}/scooter" class="nav-link text-light" style = "Margin-left: 10px;">
                   Electric Scooter
               </a>
           </li>
           <li class="nav-item ">
               <a href="/#/${categorydeal}/lamp" class="nav-link text-light" style = "Margin-left: 10px;">
                   Electic Lamp
               </a>
           </li>
           <li class="nav-item ">
               <a href="/#/${categorydeal}/recorder" class="nav-link text-light" style = "Margin-left: 10px;">
                   Video Recorder
               </a>
           </li>
           <li class="nav-item ">
               <a href="/#/${categorydeal}/webcam" class="nav-link text-light" style = "Margin-left: 10px;">
                   Webcam
               </a>
           </li>
           <li class="nav-item ">
               <a href="/#/${categorydeal}/usb" class="nav-link text-light" style = "Margin-left: 10px;">
                   USB
               </a>
           </li>
           <li class="nav-item ">
               <a href="/#/${categorydeal}/bulb" class="nav-link text-light" style = "Margin-left: 10px;">
                   Electric Bulb
               </a>
           </li>
          
           <li class="nav-item ">
               <a href="/#/${categorydeal}/car" class="nav-link text-light" style = "Margin-left: 10px;">
                   Racer Cars
               </a>
           </li>
               <li class="nav-item ">
               <a href="/#/${categorydeal}/other" class="nav-link text-light" style = "Margin-left: 10px;">
                   Others
               </a>
           </li>
       </ul>
   
   
               </div>
           </div>
   
           </div>
       `;
    }

}


export default BrandDealScreen;
