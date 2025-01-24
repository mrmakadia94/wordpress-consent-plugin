jQuery(document).ready(function ($) {
  $('#aesirx-consent-add-cookies-row').on('click', function (e) {
    e.preventDefault();
    var row = $('#aesirx-consent-blocking-cookies .aesirx-consent-cookie-row:last').clone();
    row.find('input').val('');
    $('#aesirx-consent-blocking-cookies').append(row);
  });

  $(document).on('click', '.aesirx-consent-remove-cookies-row', function (e) {
    e.preventDefault();
    $(this).parents('.aesirx-consent-cookie-row').remove();
  });

  $(document).on('click', '#sign-up-button, .sign-up-link', function (e) {
    e.preventDefault();
    $('#wpbody-content').append('<div class="aesirx-modal-backdrop"></div>');
    $('.aesirx_signup_modal').addClass('show');
  });

  $(document).on('click', '.aesirx-modal-backdrop', function (e) {
    e.preventDefault();
    $(this).remove();
    $('.aesirx_signup_modal').removeClass('show');
    if (!$('#aesirx_analytics_first_time_access').val()) {
      $('#aesirx_analytics_first_time_access').val('1');
    }
  });

  if (!$('#aesirx_analytics_first_time_access').val()) {
    $('#sign-up-button').trigger('click');
  }

  window.addEventListener(
    'message',
    (event) => {
      if (event.origin !== 'https://signup.aesirx.io') return;
      if (event.data) {
        const [key, value] = event.data.split('=');
        switch (key) {
          case 'license':
            jQuery('#aesirx_analytics_license').val(value);
            break;
          case 'client_id':
            jQuery('#aesirx_analytics_clientid').val(value);
            break;
          case 'client_secret':
            jQuery('#aesirx_analytics_secret').val(value);
            break;
          default:
            console.warn('Unknown message type:', key);
        }
      }
    },
    false
  );

  $(document).on('click', '.aesirx_consent_template_item', function (e) {
    $(this).parent().find('.aesirx_consent_template_item').removeClass('active');
    $(this).addClass('active');
  });
});
