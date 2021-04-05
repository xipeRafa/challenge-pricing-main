document.addEventListener("DOMContentLoaded", () => {
      const pageviewsDisplay = document.querySelector(".pageviews-display");
      const priceDisplay = document.querySelector(".price-display");
      const slider = document.querySelector(".CustomSlider");
      const billingMode = document.querySelector("#billing-mode");
    
      function setSlider() {
         /* The getAttribute() method returns the value of the attribute with the specified name, of an element. */
        const max = slider.getAttribute("max");
        console.log('max:',max);

        /* The getComputedStyle() method gets all the actual (computed) CSS property and values of the specified element. */
        const width = getComputedStyle(slider).getPropertyValue("--width"); /*  --width: 100%; */
        const widthValue = Number(width.slice(0, width.length - 1));
        console.log('[ widthValue ] :', widthValue)
    
        const minimumFillWidth = widthValue * 0.03;
        const maximumFillWidthRatio = 0.95;
    
        function setFilledArea() {   //filling the sliderline
          const fillRation = slider.value / max;
          let fillWidth = fillRation * widthValue * maximumFillWidthRatio;
          if (fillWidth < minimumFillWidth) fillWidth = 0;

          slider.style.setProperty("--value", fillWidth + "%");
        }
        setFilledArea();
        slider.addEventListener("input", setFilledArea);
      }
    
      function handlePrice() {
        let yearlyBillingDiscount = 0;
        let pageViews = 10;
        let price = 0;
        if (billingMode.checked) {
          yearlyBillingDiscount = 0.25;
        }
        switch (slider.value) {
          case "0":
            pageViews = "10K";
            price = 8;
            break;
          case "1":
            pageViews = "50K";
            price = 12;
            break;
          case "2":
            pageViews = "100K";
            price = 16;
            break;
          case "3":
            price = 24;
            pageViews = "500K";
            break;
          case "4":
            price = 36;
            pageViews = "1M";
            break;
        }
        price = price - price * yearlyBillingDiscount;
        pageviewsDisplay.textContent = pageViews;
        priceDisplay.textContent = price.toFixed(2);
      }
    
      //----------listenners-----------//
      slider.addEventListener("input", handlePrice);
      billingMode.addEventListener("input", handlePrice);
    
      setSlider();
    });
    