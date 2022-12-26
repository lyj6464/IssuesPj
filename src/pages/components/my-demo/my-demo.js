Component({
    properties: {
        data: {
        type: String,
        value: 'ec-canvas'
      }
    },
  
    data: {
      
      
    },
  
    ready: function () {
      // Disable prograssive because drawImage doesn't support DOM as parameter
      // See https://developers.weixin.qq.com/miniprogram/dev/api/canvas/CanvasContext.drawImage.html
  
      console.log('data',this.data)
      console.log('properties',this.properties)
  
    }
  });
  