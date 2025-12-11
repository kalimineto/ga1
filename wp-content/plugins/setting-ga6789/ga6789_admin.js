jQuery(document).ready(function ($) {
    jQuery('#ga6789_custom_image_url').on('blur', function () {
        jQuery('#ga6789_custom_image_preview').attr('src', jQuery(this).val());
    });
    jQuery('#ga6789_settings_form').on('submit', function (event) {
        event.preventDefault();

        var ga6789_custom_image_url = $('#ga6789_custom_image_url').val();
        var ga6789_custom_res_url = $('#ga6789_custom_res_url').val();
        var ga6789_custom_checkbox = $('#ga6789_custom_checkbox').is(':checked');

        submitUpdateData(ga6789_custom_image_url, ga6789_custom_res_url, ga6789_custom_checkbox);
    });
});

function submitUpdateData(img, link, enabled) {
    jQuery('#submit_ga6789_banner_bottom').text('Đang lưu dữ liệu...');

    jQuery.ajax({
        url: ga6789Url.ajaxurl,
        type: 'POST',
        data: {
            action: 'handle_submit_ga6789_banner_bottom',  // Action hook để xử lý trong PHP
            img: img,
            link: link,
            enabled: enabled
        },
        success: function(response) {
            if (response.success === true) {
                alert('Dữ liệu cập nhật thành công');
            } else {
                alert('Có lỗi xảy ra khi cập nhật dữ liệu.');
            }
            jQuery('#submit_ga6789_banner_bottom').text('Lưu thay đổi');
        },
        error: function() {
            alert('Có lỗi xảy ra khi cập nhật dữ liệu.');
            jQuery('#submit_ga6789_banner_bottom').text('Lưu thay đổi');
        }
    });
}
