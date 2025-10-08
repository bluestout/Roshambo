let selectors = {

    container : '.gift-bar-container',

    titles_container : '.gift_titles',

    progress_container : '.gift_progress',

    images_container: '.gift_images',

    prices_container : '.gift_prices',

    json_id : '#free_gifts_json',

    gift_bar_img: '.gift_bar_img',

    amount_away: '.amount-away',

    next_item: '.Next-item'

}



document.addEventListener("DOMContentLoaded", function() {

    if(document.querySelector(selectors.container) !=undefined ){

        let gift_data = JSON.parse(document.querySelector(selectors.json_id).innerHTML)

        setTitles(gift_data);

        setProgressBars(gift_data);

        setPrices(gift_data);

        setGiftImages(gift_data);

        Window.gift_data = gift_data;

    }



});



function setTitles(gift_data){

    let title_container = document.querySelector(selectors.titles_container)

    gift_data.forEach(gift => {

        title_container.innerHTML = title_container.innerHTML + `<span>${gift.title}</span>`

    })

}



function setProgressBars(gift_data){

    let progress_container = document.querySelector(selectors.progress_container)

    gift_data.forEach(gift => {

        progress_container.innerHTML = progress_container.innerHTML 

        + `<div data-vid="${gift.variant}" data-threshold=${Number(gift.threshold)} style="width:${100 / gift_data.length }%"> </div>`

    })

}



function setPrices(gift_data){

    let price_container = document.querySelector(selectors.prices_container);

    gift_data.forEach(gift => {

        price_container.innerHTML = price_container.innerHTML 

        + ` <span>$${gift.threshold}</span>`

    })

}



function setGiftImages(gift_data){

    let images_container = document.querySelector(selectors.images_container);

    gift_data.forEach(gift => {

        images_container.innerHTML = images_container.innerHTML 

        + ` <img class="gift_bar_img" width="64px" height="64px" src="${gift.img}" />`

    })

}





function setProgress(value){

    if(document.querySelector(selectors.container) !=undefined ){



        console.log('setting....')

        let thresholds = document.querySelectorAll('[data-threshold]')

        let amount_away = document.querySelector(selectors.amount_away).firstElementChild;

        thresholds.forEach(threshold => {

          threshold.style.background = ""

          threshold.style.color = ""

          threshold.classList.remove('full-progress')

        })

        

        for(let i = 0; i < thresholds.length; i++){

          let threshold = thresholds[i];

          let thresholdMax = Number(threshold.dataset.threshold)

      

          threshold.style.background = ``;

          if(value >= thresholdMax){

              let pb = threshold;

            threshold.style.background = `linear-gradient(to right, #f06c9b 100%, #1cbbb4 100% 100%)`

            threshold.style.color = "white"

            threshold.classList.add('full-progress')

            document.querySelectorAll(selectors.gift_bar_img)[i].style.border = "2px solid #f06c9b"

            amount_away.innerHTML = `0.00`

            document.querySelector(selectors.next_item).innerHTML = ""

            console.log(threshold)

            hasGiftInCart(Number(pb.dataset.vid), (hasGift, cart) => {

                var x = sessionStorage.getItem("gift");

                console.log(x);

                console.log(JSON.parse(x));

                x = JSON.parse(x);

                var containedGift = x ?  x.includes(Number(pb.dataset.vid)): false

                console.log('Contains gift: ', hasGift , ' : ' , i)

                if(!hasGift && containedGift == false){

                    console.log('adding gift...')



                    addGift(pb.dataset.vid,1)

                    setTimeout(() => {

                        $.ajax({

                            type: 'GET',

                            url: '/cart.js',

                            dataType: 'json',

                            success: function(cart) {

    

                                renderCart(cart)

                            }

                        });

                    }, 500);

                }

            })

    

          }else{

            let previousThreshold = thresholds[i - 1] == undefined ? 0 : Number(thresholds[i - 1].dataset.threshold);

            let percetangeInc = (((value - previousThreshold) / (thresholdMax - previousThreshold)) * 100).toFixed(2)

            threshold.style.background = `linear-gradient(to right, #f06c9b ${percetangeInc}%, #1cbbb4 ${percetangeInc}% 100%)`

            document.querySelectorAll(selectors.gift_bar_img)[i].style.border = "2px solid #1cbbb4"

            amount_away.innerHTML = `${Number(thresholdMax - value).toFixed(2)}`

            document.querySelector(selectors.next_item).innerHTML = Window.gift_data[i].next_item_text

            removeGift(threshold.dataset.vid)

            setTimeout(() => {

                $.ajax({

                    type: 'GET',

                    url: '/cart.js',

                    dataType: 'json',

                    success: function(cart) {

    

                        renderCart(cart)

                    }

                });

            }, 500);

            break;

          }

        }

    

    

    



    }

    

  }



  function hasGiftInCart(variant, callback){

    $.ajax({

        type: 'GET',

        url: '/cart.js',

        dataType: 'json',

        success: function(cart) {

            console.log(variant)

            console.log(cart.items.filter(item => item.variant_id == Number(variant)))

            callback(cart.items.filter(item => item.variant_id == Number(variant)).length >= 1)

        }

    });

  }



  function addGift(variant_id,qty){

    var gifts = sessionStorage.getItem("gift");

    console.log("X IS" + gifts);

    if(gifts == null) {

        gifts = [];



        gifts.push(Number(variant_id));

    }

    else {

        gifts = JSON.parse(gifts);



        if(!gifts.includes(Number(variant_id))) {

            gifts.push(Number(variant_id));

        }

    }

    data = {

        "id": Number(variant_id),

        "quantity": qty

      }

      jQuery.ajax({

        type: 'POST',

        url: '/cart/add.js',

        data: data,

        dataType: 'json',

        success: function () {

            console.log(gifts);

         

        },

    

        error: function () {

          console.log("Sorry, That item is not available")

        }

      });

  }





  function removeGift(variant_id){

    data = {

        "id": Number(variant_id),

        "quantity": 0

      }

      jQuery.ajax({

        type: 'POST',

        url: '/cart/change.js',

        data: data,

        dataType: 'json',

        success: function () {

        },

    

        error: function () {

          console.log("Sorry, That item is not available")

        }

      });

  }

