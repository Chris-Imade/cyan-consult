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

  // ── FORM SUBMIT FEEDBACK ─────────────────────
  $('.form-submit').on('click', function () {
    var $btn = $(this);
    $btn.text("✓ Enquiry Sent — We'll be in touch within 48 hours")
        .css('background', '#065C55')
        .prop('disabled', true);
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
