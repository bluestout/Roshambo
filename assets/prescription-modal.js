jQuery(document).ready(function($){
    
	//close popup
	$('.cd-popup').on('click', function(event){
       
		if( $(event.target).is('.cd-popup-close') || $(event.target).is('.cd-popup') ) {
			event.preventDefault();
			$(this).removeClass('is-visible');
          $('body').removeClass('cd_fixed');
		}
      
      $("#wi-fixedBar-container").hide();
      $(".uwy").hide();
	});
	//close popup when clicking the esc keyboard button
	$(document).keyup(function(event){
       $('body').removeClass('cd_fixed');
    	if(event.which=='27'){
    		$('.cd-popup').removeClass('is-visible');
	    }
    });
    $('#selector1').gentleSelect({
        columns: 2,
        itemWidth: 50,
        maxDisplay:10,
    });
    $('#selector2').gentleSelect({
        columns: 2,
        itemWidth: 50,
    });
    $('#selector3').gentleSelect({
        columns: 2,
        itemWidth: 50,
    });
    $('#selector4').gentleSelect({
        columns: 2,
        itemWidth: 50,
    });

    $(document).on('click','.btn-success', function(e) {
      
      let form_val = $('form#regiration_form').serialize();
      var values = {};
      $.each($("form#regiration_form").serializeArray(), function (i, field) {
          values[field.name] = field.value;
      });
      var getValue = function (valueName) {
          return values[valueName];
      };
      let upch_product = getValue('upch_product');
      let rad_variant = getValue('rad_variant');
      let radder_variant = getValue('radder_variant');
      let raddest_variant = getValue('raddest_variant');
      let mirror_blue = getValue('mirror_blue');
      let mirror_green = getValue('mirror_green');
      let mirror_purple = getValue('mirror_purple');
      let mirror_red = getValue('mirror_red');
      let mirror_chrome = getValue('mirror_chrome');
      let p_variant_id = getValue('p_variant_id');
      let upcharge_product = getValue('upcharge_product');
      let od_right_eye = getValue('properties[OD Right Eye]');
      let os_left_eye = getValue('properties[OS Left Eye]');
      let right_eye_sph = getValue('properties[Right Eye Sphere]');
      let right_eye_cyl = getValue('properties[Right Eye Cyl]');
      let od_right_Axis = getValue('properties[OD Right Axis]');
      let left_eye_sph = getValue('properties[Left Eye Sphere]');
      let left_eye_cyl = getValue('properties[Left Eye Cyl]');
      let od_left_Axis = getValue('properties[OD Right Axis]');
      let pNotes = getValue('properties[PD Notes]');
      let pd_with_one = getValue('properties[PD with one]');
      let pd_right_eye = getValue('properties[PD Right Eye]');
      let pd_left_eye = getValue('properties[PD Left Eye]');
      let single_pd = getValue('properties[Single PD]');
      let dual_pd = getValue('properties[Dual PD]');
      let pd_info = getValue('properties[PD]');
      let mail_consent = getValue('properties[Mail Consent]');
      let upgrade_pd = getValue('properties[Upgrades]');
      let mirror_coatings = getValue('properties[Coating (+$50)]');
      let optional_upgrade = getValue('properties[Optional Upgrade]');
      let include_feature_tin = getValue('properties[Include Feature with Tinted Lenses]');
      let include_feature_polar = getValue('properties[Include Feature with Polarized Lenses]');
      let include_feature_trans = getValue('properties[Include Feature with Light Responsive Lenses]');
      let pd_info_file = $("#fileID")[0].files[0];

      var variant1,variant2;
      if(upgrade_pd == "RAD"){
          variant1 = rad_variant;
          variant2 = upch_product
      }else if(upgrade_pd == "RADDER"){
         variant1 = radder_variant;
          variant2 = upch_product
      }else if(upgrade_pd == "RADDEST"){
         variant1 = raddest_variant;
          variant2 = upch_product
      }else{
        if(mirror_coatings == "Mirrored Blue"){
           variant1 = mirror_blue;
          variant2 = upch_product
        }else if(mirror_coatings == "Mirrored Green"){
           variant1 = mirror_green;
          variant2 = upch_product
        }else if(mirror_coatings == "Mirrored Purple"){
           variant1 = mirror_purple;
          variant2 = upch_product
        }else if(mirror_coatings == "Mirrored Red"){
           variant1 = mirror_red;
          variant2 = upch_product
        }else if(mirror_coatings == "Mirrored Chrome"){
           variant1 = mirror_chrome;
          variant2 = upch_product
        }else{
          if(include_feature_trans != ""){
             variant1 = "";
            variant2 = upch_product
          }else{
             variant1 = "";
          variant2 = upch_product
          }
        }
        }
       e.preventDefault();
      // alert(JSON.stringify(cart_data));
      var hasFileInput = false
      if ($("form#regiration_form").find('[type="file"]').length){
        hasFileInput = true;
      }
      if(hasFileInput){
          var formData = new FormData($('#regiration_form')[0]);
          formData.append('id', p_variant_id);
          formData.delete("properties[Mail Consent]");
          formData.delete("properties[PD with one]");
          formData.delete("properties[PD Right Eye]");
          formData.delete("properties[PD Left Eye]");
          formData.delete("properties[Right Eye Sphere]");
          formData.delete("properties[Right Eye Cyl]");
          formData.delete("properties[Left Eye Sphere]");
          formData.delete("properties[Left Eye Cyl]");
          formData.delete("properties[OD Right Axis]");
          formData.delete("properties[OD Left Axis]");
          formData.append('upload_file', $('#fileID')[0].files[0]);
          if(include_feature_tin == ""){
            formData.delete("properties[Include Feature with Tinted Lenses]");
          }
          if(include_feature_polar == ""){
            formData.delete("properties[Include Feature with Polarized Lenses]");
          }
          if(include_feature_trans == ""){
            formData.delete("properties[Include Feature with Light Responsive Lenses]");
          }
          if(optional_upgrade == ""){
            formData.delete("properties[Coating (+$50)]");
          }
          if(mirror_coatings == ""){
            formData.delete("properties[Mirrored Coating]");
          }
          if(od_right_eye == ""){
            formData.delete("properties[OD Right Eye]");
          }
          if(os_left_eye == ""){
            formData.delete("properties[OS Left Eye]");
          }
          if(pNotes == "" && pNotes == null){
            formData.delete("properties[PD Notes]");
          }
          if(single_pd == ""){
            formData.delete("properties[Single PD]");
          }
          if(dual_pd == ""){
            formData.delete("properties[Dual PD]");
          }
          if(pd_info == ""){
            formData.delete("properties[PD]");
          }
          
        // alert(JSON.stringify(formData))
          $.ajax({
            type: 'POST',
            url: '/cart/add.js',
            dataType: 'json',
            contentType: false,
            processData: false,
            data: formData,
            beforeSend :function(){
              $('.modall5').show();
              $('.modal-bg').show();
            },
            success: function(cart) {
              if(variant1 != "" && upcharge_product != 0){
                 data = { "id": variant1, "quantity": 1};
                  jQuery.ajax({
                    type: 'POST',
                    url: '/cart/add.js',
                    data: data,
                    dataType: 'json',
                    success: function () {
                        data = { "id": variant2, "quantity": 1};
                        jQuery.ajax({
                          type: 'POST',
                          url: '/cart/add.js',
                          data: data,
                          dataType: 'json',
                          success: function () {
                             setTimeout(function() { 
                                  window.location.href = "/checkout";
                             }, 1000);
                          }
                        });
                    }
                  });
              }else if(variant1 != ""){
                 data = { "id": variant1, "quantity": 1};
                  jQuery.ajax({
                    type: 'POST',
                    url: '/cart/add.js',
                    data: data,
                    dataType: 'json',
                    success: function () {
                       setTimeout(function() { 
                            window.location.href = "/checkout";
                       }, 1000);
                    }
                  });
              }else if(upcharge_product != 0){
                 data = { "id": variant2, "quantity": 1};
                  jQuery.ajax({
                    type: 'POST',
                    url: '/cart/add.js',
                    data: data,
                    dataType: 'json',
                    success: function () {
                       setTimeout(function() { 
                            window.location.href = "/checkout";
                       }, 1000);
                    }
                  });
              }else{
                 setTimeout(function() { 
                      window.location.href = "/checkout";
                 }, 1000);
              }
            }
          });
        }
       
    });
    $(document).on('click', '.modall4 .close', function(event) {

  		$('.modall4').hide();
  		$('.modal-bg').hide();
    });
  
});

//open popup
function openpopup(id) {
  event.preventDefault();
  $("#"+id+"").addClass('is-visible');
  $('body').addClass('cd_fixed');
  var final_product_price;
  $(".cd-pinfo-footer .new-price").html('<b>Price: </b>'+$("#"+id+"btn").attr('data-variant-price'))
  var price_modal = $(".bold_option_total .money").text();
  price_modal = price_modal.substring(2);
  price_modal = parseFloat(price_modal);
  var price_product = $(".tt-product-single-info .new-price .money").text();
  price_product = price_product.substring(2);
  price_product = parseFloat(price_product);
  if(price_modal){
    final_product_price = price_product + price_modal;
  }else{
    final_product_price = price_product;
  }
  
  $(".cd-pinfo-footer .money").text("$"+parseFloat(final_product_price.toFixed(2)));
}
$(document).ready(function(){

  const units = ['bytes', 'kb', 'mb', 'gb', 'tb', 'pb', 'eb', 'zb', 'yb'];
  function niceBytes(x){
    let l = 0, n = parseInt(x, 10) || 0;
    while(n >= 1024 && ++l){
        n = n/1024;
    }
    return(n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
  }
  
  const form_cc = document.querySelector(".form");
  const form_cc1 = document.querySelector(".file_refrence");
  const nextt = document.querySelector(".next");
  const bt = document.querySelector(".bt");
  const pp = document.querySelector(".pp");
  const dropArea = document.querySelector(".drop_box"),
  button = dropArea.querySelector("button"),
  dragText = dropArea.querySelector("header"),
  input = dropArea.querySelector("input");
  let file;
  var filename;

  dropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropArea.classList.add("drop-zone--over");
  });

  ["dragleave", "dragend"].forEach((type) => {
    dropArea.addEventListener(type, (e) => {
      dropArea.classList.remove("drop-zone--over");
      input.style.zIndex = "9";
    });
  });
  input.addEventListener("change", function (e) {
    var fileName = e.target.files[0].name;
    let fileSize = e.target.files[0].size;
    let filedata = "";
    if(fileSize >= 20971520){
        filedata = `<div class="after_file error_icon">
        <p><b>Error:</b> The file is too large and cannot be<br>uploaded. Maximum file size is 20MB</p>
        </div>`;
      }else{
        fileSize = niceBytes(fileSize);
        filedata = `<div class="after_file">
        <h5>${fileName}</h5>
        <h6 style="display:none" >${fileSize}</h6>
        </div>`;
        setProgressBar(50);
      }
      dropArea.classList.add("align_change");
      bt.classList.add("my-class");
      bt.innerText = "Upload a different file";
      pp.style.display = "none";
      nextt.style.display = "block";
      form_cc.innerHTML = filedata;
      form_cc1.innerHTML = filedata;
  });
  
  button.onclick = () => {
    input.click();
  };


  
  var current = 1,current_step,next_step,steps;
  steps = $("fieldset").length;
  $("#field_step_1 .next").click(function(){
    if($('#fileID').val() != ""){
    let right_eye_sph = "N/A";
    if($('#right_eye_sph').val() != ""){
      right_eye_sph = $('#right_eye_sph').val();
    }
    let right_eye_cyl = "N/A";
    if($('#right_eye_cyl').val() != ""){
      right_eye_cyl = $('#right_eye_cyl').val();
    }
    let od_right_axis = "N/A";
    if($('#od_right_axis').val() != ""){
      od_right_axis = $('#od_right_axis').val();
    }
    let left_eye_sph = "N/A";
    if($('#left_eye_sph').val() != ""){
      left_eye_sph = $('#left_eye_sph').val();
    }
    let left_eye_cyl = "N/A";
    if($('#left_eye_cyl').val() != ""){
      left_eye_cyl = $('#left_eye_cyl').val();
    }
    let os_left_axis = "N/A";
    if($('#os_left_axis').val() != ""){
      os_left_axis = $('#os_left_axis').val();
    }
    $("#od_right_eye").val("Sphere: "+right_eye_sph+", Cylinder: "+right_eye_cyl+", Axis: "+od_right_axis); 
    $("#os_left_eye").val("Sphere: "+left_eye_sph+", Cylinder: "+left_eye_cyl+", Axis: "+os_left_axis); 
    $(".cd-text-tool h2").text("Enter your Pupillary Distance");
    $(".cd-text-tool .tooltip").hide();
    $("#field_step_2").show();
    $("#field_step_1").hide();
    $("#field_step_3").hide();
    setProgressBar(50);
    $(".cd_higher_strength").hide();
    }else{
      $(".drop_box").addClass("file_not_added");
      $(".file_error").html("<p>Please upload a .JPG, .GIF, .PNG or PDF file to proceed</p>")
      setTimeout(function(){
         $(".drop_box").removeClass("file_not_added");
      }, 2000);
      $(".file_error").show().delay(2000).fadeOut();
    }
  });
  $("#field_step_2 .next").click(function(){

    if($("#mail_consent").is(':checked'))
    {
      // $("#field_step_2 .next").show();
      $(".cd_info_consent .checkmark").removeClass("not_checked");
      $(".not_checked_text").hide();
      let right_eye_sph = "";
      if($("#right_eye_sph").val() == ""){
        right_eye_sph = "N/A";
      }else{
        right_eye_sph = $("#right_eye_sph").val();
      }
      let right_eye_cyl = "";
      if($("#right_eye_cyl").val() == ""){
        right_eye_cyl = "N/A";
      }else{
        right_eye_cyl = $("#right_eye_cyl").val();
      }
      let od_right_axis = "";
      if($("#od_right_axis").val() == ""){
        od_right_axis = "N/A";
      }else{
        od_right_axis = $("#od_right_axis").val();
      }
      let left_eye_sph = "";
      if($("#left_eye_sph").val() == ""){
        left_eye_sph = "N/A";
      }else{
        left_eye_sph = $("#left_eye_sph").val();
      }
      let left_eye_cyl = "";
      if($("#left_eye_cyl").val() == ""){
        left_eye_cyl = "N/A";
      }else{
        left_eye_cyl = $("#left_eye_cyl").val();
      }
      let os_left_axis = "";
      if($("#os_left_axis").val() == ""){
        os_left_axis = "N/A";
      }else{
        os_left_axis = $("#os_left_axis").val();
      }
      let pd_with_one = $('#pd_with_one').val();
      let pd_right_eye = $('#pd_right_eye').val();
      let pd_left_eye = $('#pd_left_eye').val();
      let fina_pd = "PD: N/A";
  
      if(pd_with_one != "" && (pd_right_eye == "" || pd_left_eye == "")){
        fina_pd = "Single PD: "+pd_with_one;
        $("#single_pd").val(pd_with_one);
        $("#dual_pd").val("");
        $("#pd_info").val(""); 
      }else if(pd_with_one == "" && (pd_right_eye != "" && pd_left_eye != "")){
        fina_pd = "Dual PD: "+pd_right_eye+"/"+pd_left_eye;
        $("#dual_pd").val(pd_right_eye+"/"+pd_left_eye);
        $("#single_pd").val("");
        $("#pd_info").val(""); 
      }else{
        fina_pd = "PD: N/A";
        $("#single_pd").val("");
        $("#dual_pd").val("");
        $("#pd_info").val("N/A"); 
      }
      
  
      $(".pup_dis").text(fina_pd);
      $(".od_info").html("<p><strong>OD Right Eye</strong></p><p>Sphere: "+right_eye_sph+", Cylinder: "+right_eye_cyl+" , Axis: "+od_right_axis+"</p><p><strong>OS Left Eye</strong></p><p>Sphere: "+left_eye_sph+", Cylinder: "+left_eye_cyl+", Axis: "+os_left_axis+"</p>");
      $(".cd-text-tool h2").text("Review Your Selections");
      $(".cd-text-tool .tooltip").hide();
      $("#field_step_1").hide();
      $("#field_step_3").show();
      $("#field_step_2").hide();
      setProgressBar(100);
    }else
    {
      // $("#field_step_2 .next").hide();
      $(".cd_info_consent .checkmark").addClass("not_checked");
      $(".not_checked_text").show().delay(2000).fadeOut();
    }
    
    

  });
  $("#field_step_2 .previous, .previous_1").click(function(){
    // current_step = $(this).parent();
    // next_step = $(this).parent().prev();
    // next_step.show();
    // current_step.hide();
     $(".cd-text-tool h2").text("Submit Your Prescription");
    $(".cd-text-tool .tooltip").show();
    $("#field_step_1").show();
    $("#field_step_2").hide();
     $("#field_step_3").hide();
    setProgressBar(50);
    // setProgressBar(--current);
  });
   $("#field_step_3 .previous, .previous_2").click(function(){
    // current_step = $(this).parent();
    // next_step = $(this).parent().prev();
    // next_step.show();
    // current_step.hide();
     $(".cd-text-tool h2").text("Enter Your Pupillary Distance");
     $(".cd-text-tool .tooltip").hide();
      $("#field_step_1").hide();
    $("#field_step_2").show();
    $("#field_step_3").hide();
    setProgressBar(75);
    // setProgressBar(--current);
  });
  setProgressBar(5);
  function c_val(pass_data){
    let return_val;
     if(pass_data != ""){
        return_val = pass_data.substring(1);
        return_val = parseFloat(return_val);
        return_val = return_val + 1.00;
      }else{
        return_val = 0;
      }
    return return_val;
  }
  $(document).on('click','#right_eye_sph_d .rxc-prescription-select-table-option', function(event) {
      $("#right_eye_sph_d .rxc-prescription-select-table-option").each(function() {
          $(this).removeClass("selected-rxc");
      });
      $(this).addClass("selected-rxc");
      let right_eye_sph_nu,right_eye_cyl_nu,left_eye_sph_nu,left_eye_cyl_nu;
      let right_eye_sph_d = $(this).text();
      right_eye_sph_nu = c_val(right_eye_sph_d);
      
      let right_eye_cyl_d = $("#right_eye_cyl").val();
      right_eye_cyl_nu = c_val(right_eye_cyl_d);
     
      let left_eye_sph_d = $("#left_eye_sph").val();
      left_eye_sph_nu = c_val(left_eye_sph_d);
      
      let left_eye_cyl_d = $("#left_eye_cyl").val();
      left_eye_cyl_nu = c_val(left_eye_cyl_d);

      let select_nu = right_eye_sph_d.substring(1);
      let price_update = $(".tt-product-single-info .tt-price .new-price .money").text();
      price_update = price_update.substring(2);
      price_update = parseFloat(price_update);
      let price_modal = $(".bold_option_total .money").text();
      price_modal = price_modal.substring(2);
      price_modal = parseFloat(price_modal);
      if(price_modal){
        price_update = price_update + price_modal;
      }else{
        price_update = price_update;
      }
  
      select_nu = parseFloat(select_nu);
      select_nu = select_nu + 1.00;
      if(right_eye_sph_nu > 7 || right_eye_cyl_nu > 3 || left_eye_sph_nu > 7 || left_eye_cyl_nu > 3){$(".cd_higher_strength").show();price_update = parseFloat(price_update + 50.00);$('#upcharge_product').val(45075601195178);}
      else{$(".cd_higher_strength").hide();$('#upcharge_product').val(0)}

      $(".cd-pinfo-footer .new-price .money").text("$"+price_update.toFixed(2));
      
      $('#right_eye_sph').val(right_eye_sph_d);
      $('#right_eye_sph').addClass("right_eye_sph_selected");
    
    if($("#fileID").val() != ''){ setProgressBar(50);}else{setProgressBar(25);}
      
  });
  $(document).on('click','#right_eye_cyl_d .rxc-prescription-select-table-option', function(event) {
    $("#right_eye_cyl_d .rxc-prescription-select-table-option").each(function() {
          $(this).removeClass("selected-rxc");
      });
     $(this).addClass("selected-rxc");
    let right_eye_sph_nu,right_eye_cyl_nu,left_eye_sph_nu,left_eye_cyl_nu;
    let right_eye_sph_d = $("#right_eye_sph").val();
    right_eye_sph_nu = c_val(right_eye_sph_d);
    
    let right_eye_cyl_d = $(this).text();
    right_eye_cyl_nu = c_val(right_eye_cyl_d);
   
    let left_eye_sph_d = $("#left_eye_sph").val();
    left_eye_sph_nu = c_val(left_eye_sph_d);
    
    let left_eye_cyl_d = $("#left_eye_cyl").val();
    left_eye_cyl_nu = c_val(left_eye_cyl_d);
    
    let select_nu = right_eye_cyl_d.substring(1);
    let price_update = $(".tt-product-single-info .tt-price .new-price .money").text();
    price_update = price_update.substring(2);
    price_update = parseFloat(price_update);
    let price_modal = $(".bold_option_total .money").text();
    price_modal = price_modal.substring(2);
    price_modal = parseFloat(price_modal);
    if(price_modal){
        price_update = price_update + price_modal;
    }else{
      price_update = price_update;
    }
    select_nu = parseFloat(select_nu);
    select_nu = select_nu + 1.00;
    if(right_eye_sph_nu > 7 || right_eye_cyl_nu > 3 || left_eye_sph_nu > 7 || left_eye_cyl_nu > 3){$(".cd_higher_strength").show();price_update = parseFloat(price_update + 50.00);$('#upcharge_product').val(45075601195178);}
    else{$(".cd_higher_strength").hide();$('#upcharge_product').val(0)}
    $(".cd-pinfo-footer .new-price .money").text("$"+price_update.toFixed(2));
    $('#right_eye_cyl').val(right_eye_cyl_d);
    $('#right_eye_cyl').addClass("right_eye_cyl_selected");
    if($("#fileID").val() != ''){ setProgressBar(50);}else{setProgressBar(25);}
  });
  $(document).on('click','#left_eye_sph_d .rxc-prescription-select-table-option', function(event) {
    $("#left_eye_sph_d .rxc-prescription-select-table-option").each(function() {
          $(this).removeClass("selected-rxc");
      });
     $(this).addClass("selected-rxc");
      let right_eye_sph_nu,right_eye_cyl_nu,left_eye_sph_nu,left_eye_cyl_nu;
      let right_eye_sph_d = $("#right_eye_sph").val();
      right_eye_sph_nu = c_val(right_eye_sph_d);
      
      let right_eye_cyl_d = $("#right_eye_cyl").val();
      right_eye_cyl_nu = c_val(right_eye_cyl_d);
     
      let left_eye_sph_d = $(this).text();
      left_eye_sph_nu = c_val(left_eye_sph_d);
      
      let left_eye_cyl_d = $("#left_eye_cyl").val();
      left_eye_cyl_nu = c_val(left_eye_cyl_d);

      let select_nu = left_eye_sph_d.substring(1);
      let price_update = $(".tt-product-single-info .tt-price .new-price .money").text();
      price_update = price_update.substring(2);
      price_update = parseFloat(price_update);
      let price_modal = $(".bold_option_total .money").text();
      price_modal = price_modal.substring(2);
      price_modal = parseFloat(price_modal);
      if(price_modal){
        price_update = price_update + price_modal;
      }else{
        price_update = price_update;
      }
      select_nu = parseFloat(select_nu);
      select_nu = select_nu + 1.00;
      if(right_eye_sph_nu > 7 || right_eye_cyl_nu > 3 || left_eye_sph_nu > 7 || left_eye_cyl_nu > 3){$(".cd_higher_strength").show();price_update = parseFloat(price_update + 50.00);$('#upcharge_product').val(45075601195178);}
      else{$(".cd_higher_strength").hide();$('#upcharge_product').val(0)}
      $(".cd-pinfo-footer .new-price .money").text("$"+price_update.toFixed(2));
      $('#left_eye_sph').val(left_eye_sph_d);
      $('#left_eye_sph').addClass("left_eye_sph_selected");
      if($("#fileID").val() != ''){ setProgressBar(50);}else{setProgressBar(25);}
  });
  $(document).on('click','#left_eye_cyl_d .rxc-prescription-select-table-option', function(event) {
    $("#left_eye_cyl_d .rxc-prescription-select-table-option").each(function() {
          $(this).removeClass("selected-rxc");
      });
     $(this).addClass("selected-rxc");
      let right_eye_sph_nu,right_eye_cyl_nu,left_eye_sph_nu,left_eye_cyl_nu;
      let right_eye_sph_d = $("#right_eye_sph").val();
      right_eye_sph_nu = c_val(right_eye_sph_d);
      
      let right_eye_cyl_d = $("#right_eye_cyl").val();
      right_eye_cyl_nu = c_val(right_eye_cyl_d);
     
      let left_eye_sph_d = $("#left_eye_sph").val();
      left_eye_sph_nu = c_val(left_eye_sph_d);
      
      let left_eye_cyl_d = $(this).text();
      left_eye_cyl_nu = c_val(left_eye_cyl_d);

      let select_nu = left_eye_cyl_d.substring(1);
      let price_update = $(".tt-product-single-info .tt-price .new-price .money").text();
      price_update = price_update.substring(2);
      price_update = parseFloat(price_update);
      let price_modal = $(".bold_option_total .money").text();
      price_modal = price_modal.substring(2);
      price_modal = parseFloat(price_modal);
      if(price_modal){
        price_update = price_update + price_modal;
      }else{
        price_update = price_update;
      }
      select_nu = parseFloat(select_nu);
      select_nu = select_nu + 1.00;
      if(right_eye_sph_nu > 7 || right_eye_cyl_nu > 3 || left_eye_sph_nu > 7 || left_eye_cyl_nu > 3){$(".cd_higher_strength").show();price_update = parseFloat(price_update + 50.00);$('#upcharge_product').val(45075601195178);}
      else{$(".cd_higher_strength").hide();$('#upcharge_product').val(0)}
      $(".cd-pinfo-footer .new-price .money").text("$"+price_update.toFixed(2));
      $('#left_eye_cyl').val(left_eye_cyl_d);
      $('#left_eye_cyl').addClass("left_eye_cyl_selected");
      if($("#fileID").val() != ''){ setProgressBar(50);}else{setProgressBar(25);}
  });
   $(document).on('click','#pd_with_one_d .options div', function(event) {
      $("#pd_with_one_d div").each(function() {
          $(this).removeClass("selected-rxc");
      });
     $(this).addClass("selected-rxc");
    let selec_val =$(this).text();
    $('#pd_with_one').val(selec_val);
     $('#pd_right_eye').val("");
     $('#pd_left_eye').val("");
    $('#pd_with_one').addClass("pd_with_one_selected");
     // $("#field_step_2 .next").show();
    setProgressBar(75);
  });
  $(document).on('click','#pd_right_eye_d .options div', function(event) {
    $("#pd_right_eye_d div").each(function() {
          $(this).removeClass("selected-rxc");
      });
     $(this).addClass("selected-rxc");
    let selec_val =$(this).text();
    $('#pd_right_eye').val(selec_val);
    $('#pd_with_one_d').val("");
    $('#pd_right_eye').addClass("pd_right_eye_selected");
    // $("#field_step_2 .next").show();
    setProgressBar(75);
  });
  $(document).on('click','#pd_left_eye_d .options div', function(event) {
    $("#pd_left_eye_d div").each(function() {
          $(this).removeClass("selected-rxc");
      });
     $(this).addClass("selected-rxc");
    let selec_val =$(this).text();
    $('#pd_left_eye').val(selec_val);
    $('#pd_with_one_d').val("");
    $('#pd_left_eye').addClass("pd_left_eye_selected");
    // $("#field_step_2 .next").show();
    setProgressBar(75);
  });
  $(document).on('click','#mail_consent', function(event) {
    if($(this).is(':checked'))
    {
      $("#field_step_2 .next").show();
      $(".cd_info_consent .checkmark").removeClass("not_checked");
      $(".not_checked_text").hide();
    }else
    {
      $(".cd_info_consent .checkmark").addClass("not_checked");
      $(".not_checked_text").show().delay(2000).fadeOut();
    }
  });

  var variant_title = $('.cd-popup').attr('data-t');
  
  if(variant_title.indexOf("Clear") != -1 && variant_title.indexOf("Polycarbonate") != -1){
      $('#upgrade_pd').val("");
      $('#optional_upgrade').val("");
      $('#mirror_coating').val("");
      $('#include_feature_tin').val("");
      $('#include_feature_polar').val("");
      $('#include_feature_trans').val("");
  }else if(variant_title.indexOf("Clear") != -1){
     $('#upgrade_pd').val("RAD");
      $('#optional_upgrade').val("");
      $('#mirror_coating').val("");
      $('#include_feature_tin').val("");
      $('#include_feature_polar').val("");
      $('#include_feature_trans').val("");
  }else if(variant_title.indexOf("Tinted Sunglasses") != -1){
     $('#upgrade_pd').val("");
     $('#mirror_coating').val("Mirrored Blue");
     $('#optional_upgrade').val("Mirrored");
     $('#include_feature_tin').val("1 Year Scratch Warranty");
      $('#include_feature_polar').val("");
      $('#include_feature_trans').val("");
  }else if(variant_title.indexOf("Polarized Sunglasses") != -1){
      $('#upgrade_pd').val("");
       $('#mirror_coating').val("Mirrored Blue");
      $('#optional_upgrade').val("Mirrored");
      $('#include_feature_tin').val("");
     $('#include_feature_polar').val("1 Year Scratch Warranty");
      $('#include_feature_trans').val("");
  }else if(variant_title.indexOf("Light Responsive") != -1){
      $('#upgrade_pd').val("");
     $('#mirror_coating').val("");
      $('#optional_upgrade').val("");
      $('#include_feature_tin').val("");
     $('#include_feature_polar').val("");
      $('#include_feature_trans').val("Blue Light Filter + 1 Year Scratch Warranty");
  }else{
     $('#upgrade_pd').val("");
      $('#optional_upgrade').val("");
     $('#mirror_coating').val("");
      $('#include_feature_tin').val("");
      $('#include_feature_polar').val("");
      $('#include_feature_trans').val("");
   }
  $(document).on('click', '#boldSelector', function(event) {
     let boldSelector =$(this).attr("data-value");
     if(boldSelector == "Clear"){
       $('#upgrade_pd').val("RAD");
        $('#optional_upgrade').val("");
       $('#mirror_coating').val("");
        $('#include_feature_tin').val("");
        $('#include_feature_polar').val("");
        $('#include_feature_trans').val("");
     }else if(boldSelector == "Tinted Sunglasses"){
       $('#upgrade_pd').val("");
       $('#mirror_coating').val("Mirrored Blue");
       $('#optional_upgrade').val("Mirrored");
       $('#include_feature_tin').val("1 Year Scratch Warranty");
        $('#include_feature_polar').val("");
        $('#include_feature_trans').val("");
     }else if(boldSelector == "Polarized Sunglasses"){
        $('#upgrade_pd').val("");
         $('#mirror_coating').val("Mirrored Blue");
        $('#optional_upgrade').val("Mirrored");
        $('#include_feature_tin').val("");
       $('#include_feature_polar').val("1 Year Scratch Warranty");
        $('#include_feature_trans').val("");
     }else if(boldSelector == "Light Responsive"){
        $('#upgrade_pd').val("");
       $('#mirror_coating').val("");
        $('#optional_upgrade').val("");
        $('#include_feature_tin').val("");
       $('#include_feature_polar').val("");
        $('#include_feature_trans').val("Blue Light Filter + 1 Year Scratch Warranty");
     }else{
       $('#upgrade_pd').val("");
        $('#optional_upgrade').val("");
       $('#mirror_coating').val("");
        $('#include_feature_tin').val("");
        $('#include_feature_polar').val("");
        $('#include_feature_trans').val("");
     }
  });
  $(document).on('click', '.bold_option_value_element', function(event) {
    let boldMirror =$(this).find('input').val();
     if(boldMirror == "Mirrored Blue"){
       $('#mirror_coating').val("Mirrored Blue");
     }else if(boldMirror == "Mirrored Green"){ 
       $('#mirror_coating').val("Mirrored Green");
     }else if(boldMirror == "Mirrored Purple"){
       $('#mirror_coating').val("Mirrored Purple");
     }else if(boldMirror == "Mirrored Chrome"){
       $('#mirror_coating').val("Mirrored Chrome");
     }else{
       $('#mirror_coating').val("Mirrored Blue");
     }
  });
  
  $(document).on('click', '.sw_1514989_614414', function(event) {
     let upgrade_val =$(this).val();
      $('#upgrade_pd').val(upgrade_val);
  });

  $(document).on('click', '.sw_1512901_614414', function(event) {
     let mirror_coating =$(this).val();
      $('#mirror_coating').val(upgrade_val);
  });

  // Change progress bar action
  function setProgressBar(curStep){
    // var percent = parseFloat(100 / steps) * curStep;
    var percent = curStep;
    percent = percent.toFixed();
    $(".progress-bar")
      .css("width",percent+"%")
      .html(percent+"%");   
  }
});

$( "#regiration_form" ).submit(function(event) {
    // jQuery('.alert-success').removeClass('hide').html( "Handler for .submit() called and see console logs for your posted variable" );
    console.log($(this).serialize());
    event.preventDefault();
});



$(document).ready(function(){
  $(document).on('click', '.modal-link3', function(event) {
        $('.modall3').show();
        $('.modal-bg').show();
  });
  $(document).on('click', '.modall3 .close', function(event) {
		$('.modall3').hide();
		$('.modal-bg').hide();
  });
  $(document).on('click', '.modal-link1', function(event) {
        $('.modall1').show();
        $('.modal-bg').show();
  });
  $(document).on('click', '.modall1 .close', function(event) {
		$('.modall1').hide();
		$('.modal-bg').hide();
  });
  $(document).on('click', '.modal-link2', function(event) {
        $('.modall2').show();
        $('.modal-bg').show();
  });
  $(document).on('click', '.modall2 .close', function(event) {
		$('.modall2').hide();
		$('.modal-bg').hide();
  });
  $(document).on('click', '.cdh_str_close',function(event) {
		$('.cd_higher_strength').hide();
  });
  $(document).on('click', '.pd-1-s',function(event) {
         $('#pd_right_eye').val("");
         $('#pd_left_eye').val("");
		$(this).addClass("active");
        $(".pd-2-s").removeClass("active");
        $('.pd-1').show();
        $('.pd-2').hide();
  });
  $(document).on('click', '.pd-2-s',function(event) {
      $('#pd_with_one').val("");
		$(this).addClass("active");
        $(".pd-1-s").removeClass("active");
        $('.pd-2').show();
        $('.pd-1').hide();
  });
})

function right_eye_sph_d() {
  document.getElementById("right_eye_sph_d").classList.toggle("show");
  document.getElementById("right_eye_sph").classList.add("right_eye_sph_shadow");
}
function right_eye_cyl_d() {
  document.getElementById("right_eye_cyl_d").classList.toggle("show");
  document.getElementById("right_eye_cyl").classList.add("right_eye_cyl_shadow");
}
function left_eye_sph_d() {
  document.getElementById("left_eye_sph_d").classList.toggle("show");
  document.getElementById("left_eye_sph").classList.add("left_eye_sph_shadow");
}
function left_eye_cyl_d() {
  document.getElementById("left_eye_cyl_d").classList.toggle("show");
  document.getElementById("left_eye_cyl").classList.add("left_eye_cyl_shadow");
}
function pd_with_one_d() {
  document.getElementById("pd_with_one_d").classList.toggle("show");
  document.getElementById("pd_with_one").classList.add("pd_with_one_shadow");
}
function pd_right_eye_d() {
  document.getElementById("pd_right_eye_d").classList.toggle("show");
  document.getElementById("pd_right_eye").classList.add("pd_right_eye_shadow");
}
function pd_left_eye_d() {
  document.getElementById("pd_left_eye_d").classList.toggle("show");
  document.getElementById("pd_left_eye").classList.add("pd_left_eye_shadow");
}
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn1')) {
    var dropbtn1 = document.getElementsByClassName("dropbtn1");
    var y;
    for (y = 0; y < dropbtn1.length; y++) {
      var openDropdown1 = dropbtn1[y];
      if (openDropdown1.classList.contains('right_eye_sph_shadow')) {
        openDropdown1.classList.remove('right_eye_sph_shadow');
      }
    }
    var dropdowns = document.getElementsByClassName("dropdown-content1");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  } 
  if (!event.target.matches('.dropbtn2')) {
    var dropbtn1 = document.getElementsByClassName("dropbtn2");
    var y;
    for (y = 0; y < dropbtn1.length; y++) {
      var openDropdown1 = dropbtn1[y];
      if (openDropdown1.classList.contains('right_eye_cyl_shadow')) {
        openDropdown1.classList.remove('right_eye_cyl_shadow');
      }
    }
    var dropdowns = document.getElementsByClassName("dropdown-content2");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
  if (!event.target.matches('.dropbtn3')) {
    var dropbtn1 = document.getElementsByClassName("dropbtn3");
    var y;
    for (y = 0; y < dropbtn1.length; y++) {
      var openDropdown1 = dropbtn1[y];
      if (openDropdown1.classList.contains('left_eye_sph_shadow')) {
        openDropdown1.classList.remove('left_eye_sph_shadow');
      }
    }
    var dropdowns = document.getElementsByClassName("dropdown-content3");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
  if (!event.target.matches('.dropbtn4')) {
    var dropbtn1 = document.getElementsByClassName("dropbtn4");
    var y;
    for (y = 0; y < dropbtn1.length; y++) {
      var openDropdown1 = dropbtn1[y];
      if (openDropdown1.classList.contains('left_eye_cyl_shadow')) {
        openDropdown1.classList.remove('left_eye_cyl_shadow');
      }
    }
    var dropdowns = document.getElementsByClassName("dropdown-content4");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
   if (!event.target.matches('.dropbtn5')) {
    var dropbtn1 = document.getElementsByClassName("dropbtn5");
    var y;
    for (y = 0; y < dropbtn1.length; y++) {
      var openDropdown1 = dropbtn1[y];
      if (openDropdown1.classList.contains('pd_with_one_shadow')) {
        openDropdown1.classList.remove('pd_with_one_shadow');
      }
    }
    var dropdowns = document.getElementsByClassName("dropdown-content5");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
  if (!event.target.matches('.dropbtn6')) {
    var dropbtn1 = document.getElementsByClassName("dropbtn6");
    var y;
    for (y = 0; y < dropbtn1.length; y++) {
      var openDropdown1 = dropbtn1[y];
      if (openDropdown1.classList.contains('pd_right_eye_shadow')) {
        openDropdown1.classList.remove('pd_right_eye_shadow');
      }
    }
    var dropdowns = document.getElementsByClassName("dropdown-content6");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
  if (!event.target.matches('.dropbtn7')) {
    var dropbtn1 = document.getElementsByClassName("dropbtn7");
    var y;
    for (y = 0; y < dropbtn1.length; y++) {
      var openDropdown1 = dropbtn1[y];
      if (openDropdown1.classList.contains('pd_left_eye_shadow')) {
        openDropdown1.classList.remove('pd_left_eye_shadow');
      }
    }
    var dropdowns = document.getElementsByClassName("dropdown-content7");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
