$(document).ready(function () {

  // ── CUSTOM CURSOR ────────────────────────────
  const $cursor = $('#cursor');
  const $ring = $('#cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;

  $(document).on('mousemove', function (e) {
    mx = e.clientX;
    my = e.clientY;
    $cursor.css({ left: mx, top: my });
  });

  function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    $ring.css({ left: rx, top: ry });
    requestAnimationFrame(animateRing);
  }
  animateRing();

  $('a, button, .tier, .pkg, .case, .diff-item, .process-step, .insight-card').on('mouseenter', function () {
    $cursor.css({ transform: 'translate(-50%,-50%) scale(2.5)', background: '#D4894A' });
    $ring.css({ width: 56, height: 56 });
  }).on('mouseleave', function () {
    $cursor.css({ transform: 'translate(-50%,-50%) scale(1)', background: '#0A7B72' });
    $ring.css({ width: 36, height: 36 });
  });

  // ── NAV SCROLL ───────────────────────────────
  $(window).on('scroll', function () {
    $('#navbar').toggleClass('scrolled', $(window).scrollTop() > 60);
  });

  // ── INTERSECTION OBSERVER REVEAL ─────────────
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  $('.reveal').each(function () { observer.observe(this); });

  // ── SMOOTH ANCHOR SCROLL ─────────────────────
  $('a[href^="#"]').on('click', function (e) {
    var target = $($(this).attr('href'));
    if (target.length) {
      e.preventDefault();
      $('html, body').animate({ scrollTop: target.offset().top }, 800, 'swing');
    }
  });

  // ── FORM SUBMIT WITH VALIDATION ──────────────
  $('.form-submit').on('click', function () {
    var $btn = $(this);
    var $form = $btn.closest('.contact-form-area');
    var valid = true;

    // Clear previous error states
    $form.find('.form-error').remove();
    $form.find('input, select, textarea').css('border-color', '');

    // Validate all required fields
    $form.find('input, textarea').each(function () {
      if ($.trim($(this).val()) === '') {
        valid = false;
        $(this).css('border-color', '#c0392b');
        if (!$(this).next('.form-error').length) {
          $(this).after('<span class="form-error">This field is required</span>');
        }
      }
    });

    // Validate select
    $form.find('select').each(function () {
      if ($(this).val() === '') {
        valid = false;
        $(this).css('border-color', '#c0392b');
        if (!$(this).next('.form-error').length) {
          $(this).after('<span class="form-error">Please select an option</span>');
        }
      }
    });

    if (!valid) {
      // Shake the button briefly
      $btn.addClass('shake');
      setTimeout(function () { $btn.removeClass('shake'); }, 500);
      return;
    }

    // -- Simulate submission --
    var originalText = $btn.text();
    $btn.text('Sending…').prop('disabled', true).css('opacity', '0.7');

    setTimeout(function () {
      // Hide form fields with a fade
      $form.find('.form-row, .form-group, .form-submit').fadeOut(400, function () {
        // Show success message once all elements have faded
        if ($form.find('.form-success').length === 0) {
          $form.append(
            '<div class="form-success">' +
              '<div class="form-success-icon">✓</div>' +
              '<h3 class="form-success-title">Enquiry Sent Successfully</h3>' +
              '<p class="form-success-text">Thank you for reaching out. A member of our team will respond within 48 business hours.</p>' +
              '<button class="form-reset-btn">Send Another Enquiry</button>' +
            '</div>'
          );
          $form.find('.form-success').hide().fadeIn(500);

          // Reset handler
          $form.find('.form-reset-btn').on('click', function () {
            $form.find('.form-success').fadeOut(300, function () {
              $(this).remove();
              $form.find('input').val('');
              $form.find('textarea').val('');
              $form.find('select').val('');
              $form.find('.form-row, .form-group, .form-submit').fadeIn(400);
              $btn.text(originalText).prop('disabled', false).css('opacity', '1');
            });
          });
        }
      });
    }, 1200);
  });

  // ── JQUERY SCROLL-TRIGGERED ANIMATIONS ───────

  // Utility: check if element is in viewport (with offset)
  function isInView($el, offset) {
    offset = offset || 0.15;
    var winTop = $(window).scrollTop();
    var winBot = winTop + $(window).height();
    var elTop = $el.offset().top;
    var threshold = $(window).height() * offset;
    return elTop + threshold < winBot;
  }

  // Animate elements when scrolled into view
  function triggerScrollAnimations() {
    // Fade-in elements
    $('.anim-fade-in').each(function () {
      if (isInView($(this)) && !$(this).hasClass('animate')) {
        $(this).addClass('animate');
      }
    });

    // Slide-left elements
    $('.anim-slide-left').each(function () {
      if (isInView($(this)) && !$(this).hasClass('animate')) {
        $(this).addClass('animate');
      }
    });

    // Slide-right elements
    $('.anim-slide-right').each(function () {
      if (isInView($(this)) && !$(this).hasClass('animate')) {
        $(this).addClass('animate');
      }
    });

    // Scale-in elements
    $('.anim-scale-in').each(function () {
      if (isInView($(this)) && !$(this).hasClass('animate')) {
        $(this).addClass('animate');
      }
    });

    // Stagger container children
    $('.anim-stagger').each(function () {
      if (isInView($(this)) && !$(this).hasClass('animate')) {
        $(this).addClass('animate');
      }
    });

    // Animated number count-up
    $('.anim-count').each(function () {
      var $el = $(this);
      if (isInView($el) && !$el.data('counted')) {
        $el.data('counted', true);
        var raw = $el.text().trim();
        // Extract numeric part, prefix (like $), and suffix (like K+, M+, %, +)
        var match = raw.match(/^([^0-9]*)([0-9]+)(.*)$/);
        if (match) {
          var prefix = match[1];
          var target = parseInt(match[2], 10);
          var suffix = match[3];
          $({ val: 0 }).animate({ val: target }, {
            duration: 1800,
            easing: 'swing',
            step: function () {
              $el.text(prefix + Math.floor(this.val) + suffix);
            },
            complete: function () {
              $el.text(prefix + target + suffix);
            }
          });
        }
      }
    });
  }

  $(window).on('scroll', triggerScrollAnimations);
  // Trigger once on load for elements already in view
  triggerScrollAnimations();

  // ── PARALLAX SUBTLE EFFECT ON HERO ───────────
  $(window).on('scroll', function () {
    var st = $(window).scrollTop();
    if (st < window.innerHeight) {
      $('.hero-accent').css('transform', 'rotate(' + (st * 0.05) + 'deg) translateY(' + (st * 0.15) + 'px)');
      $('.hero-stats').css('transform', 'translateY(' + (st * 0.08) + 'px)');
    }
  });

  // ── TIERS HOVER TILT (SUBTLE) ────────────────
  $('.tier').on('mousemove', function (e) {
    var $card = $(this);
    var rect = this.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    var midX = rect.width / 2;
    var midY = rect.height / 2;
    var rotX = ((y - midY) / midY) * -3;
    var rotY = ((x - midX) / midX) * 3;
    $card.css('transform', 'translateY(-4px) perspective(600px) rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg)');
  }).on('mouseleave', function () {
    $(this).css('transform', 'translateY(0) perspective(600px) rotateX(0) rotateY(0)');
  });

  // ── IMPACT NUMBER CARDS PULSE ON ENTER ───────
  $('.impact-num-card').on('mouseenter', function () {
    $(this).find('.impact-num-big').css({
      transform: 'scale(1.08)',
      transition: 'transform 0.3s ease'
    });
  }).on('mouseleave', function () {
    $(this).find('.impact-num-big').css({
      transform: 'scale(1)',
      transition: 'transform 0.3s ease'
    });
  });

  // ── FEATHER ICONS INIT ───────────────────────
  if (typeof feather !== 'undefined') {
    feather.replace();
  }

});
