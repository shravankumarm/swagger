
(function() {
  var THEMES, animateHeader, init, setupNumberSections, setupOnePageScroll ;

cron();

  THEMES = [
    {
      name: 'train-station',
      odometerOptions: {
        format: 'd'
      },
      numbers: [
        {
          number: 7,
          //description: '= 28<sup>2</sup> + 96<sup>2</sup> = 60<sup>2</sup> + 80<sup>2</sup>',
          description: 'Venues All Over U.S',
          //detail: 'two sums of two squares',
          //source: 'http://www.wolframalpha.com/input/?i=10000'
        }, {
          number: 25000,
           description: 'Total seats in all the venues',
          // description: '<span class=\'equals\'>=</span> <span class=\'number\'>11000011010011111</span><sub>2</sub>',
          // detail: '11000011010011111 in base 2',
          // source: 'http://www.wolframalpha.com/input/?i=99999'
        }
      ]
    }, 
    {
      name: 'train-station',
      odometerOptions: {
        format: 'd'
      },
      numbers: [
        {
          number: 900,
          //description: '= 28<sup>2</sup> + 96<sup>2</sup> = 60<sup>2</sup> + 80<sup>2</sup>',
          description: 'Events A Year',
          //detail: 'two sums of two squares',
          //source: 'http://www.wolframalpha.com/input/?i=10000'
        }, {
          number: 800,
           description: 'Seats sold every minute',
          // description: '<span class=\'equals\'>=</span> <span class=\'number\'>11000011010011111</span><sub>2</sub>',
          // detail: '11000011010011111 in base 2',
          // source: 'http://www.wolframalpha.com/input/?i=99999'
        }
      ]
    }, 
    {
      name: 'train-station',
      odometerOptions: {
        format: 'd'
      },
      numbers: [
        {
          number: 30,
          description: 'Artists are performing',
          detail: '',
         // source: 'http://en.wikipedia.org/wiki/Longest_trains'
        }, {
          number: 20,
          description: 'Live events',
          detail: '',
          //source: 'http://en.wikipedia.org/wiki/Airbus_A380'
        }
      ]
    }
  ];

  animateHeader = function() {
    return $('.title-number-section .odometer').addClass('odometer-animating-up odometer-animating');
  };

  setupOnePageScroll = function() {
    return $(function() {
      $('.main').onepage_scroll({
        sectionContainer: '.section'
      });
      $('.down-arrow').click(function() {
        return $('.main').moveDown();
      });
      return $(document).keydown(function(e) {
        switch (e.keyCode) {
          case 40:
          case 34:
            return $('.main').moveDown();
          case 33:
          case 38:
            return $('.main').moveUp();
        }
      });
    });
  };

  setupNumberSections = function() {
    var $afterSections, $numberSectionTemplate, $numberSectionTemplateClone;
    $afterSections = $('.after-number-sections');
    $numberSectionTemplate = $('.number-section.template');
    $numberSectionTemplateClone = $numberSectionTemplate.clone().removeClass('template');
    _.each(THEMES, function(theme) {
      var $odometerContainer, $section, currentNumber, next, odometer, odometerOptions;
      $section = $numberSectionTemplateClone.clone().addClass('number-section-theme-' + theme.name);
      $afterSections.before($section);
      $odometerContainer = $section.find('.odometer-container');
      $odometerContainer.append('<div/>');
      $odometerContainer = $odometerContainer.find('div');
      currentNumber = 0;
      odometerOptions = $.extend(true, {}, theme.odometerOptions || {}, {
        theme: theme.name,
        value: theme.numbers[1].number,
        el: $odometerContainer[0]
      });
      odometer = new Odometer(odometerOptions);
      odometer.render();
      next = function() {
        var number;
        number = theme.numbers[currentNumber];
        odometer.update(number.number);
        $section.find('.number-description').html(number.description);
        $section.find('.number-detail').html(number.detail);
        $section.find('.number-source').attr('href', number.source);
        return currentNumber = (currentNumber + 1) % theme.numbers.length;
      };
      next();
      return setInterval(function() {
        if ($section.hasClass('active')) {
          return next();
        }
      }, 4 * 1000);
    });
    $afterSections.remove();
    return $numberSectionTemplate.remove();
  };

  init = function() {
    setupNumberSections();
    setupOnePageScroll();
    return setTimeout(function() {
      return animateHeader();
    }, 500);
  };

  init();

}).call(this);
