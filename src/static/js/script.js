/* eslint-disable no-undef */
const headerMobileMenuBtn = document.querySelector('.header__menu-btn');
const mobileMenuBlock = document.querySelector('.menu__block');
let isMenuHidden = true;

headerMobileMenuBtn.addEventListener('click', () => {
  headerMobileMenuBtn.classList.toggle('active');
  mobileMenuBlock.classList.toggle('active');
  isMenuHidden = !isMenuHidden;
  document.body.style.overflowY = isMenuHidden ? 'initial' : 'hidden';
});

const tools = {
  createElement(type, content = '', parent) {
    // eslint-disable-next-line no-undef
    const element = document.createElement(type);
    element.innerHTML = content;
    parent.appendChild(element);
    return element;
  },
};

const customerReviews = [
  {
    name: 'Edward Newgate',
    position: 'Founder Circle',
    phrase:
      '“Our dedicated patient engagement app and web portal allow you to access information instantaneously (no tedeous form, long calls, or administrative hassle) and securely”',
    img: 'static/img/customer_example.png',
  },
  {
    name: 'John Doe',
    position: 'Founder Google',
    phrase:
      '“Our dedicated patient engagement app and web portal allow you to access information instantaneously (no tedeous form, long calls, or administrative hassle) and securely”',
    img: 'static/img/customer_example.png',
  },
];

class CustomerReviewGallery {
  constructor(theCustomerReviews) {
    this.customerReviews = theCustomerReviews;
    this.init();
  }

  init() {
    const reviewsNum = this.customerReviews.length;
    if (reviewsNum === 0) return;
    this.buildStructure();
    this.buildControl();
    this.switchTo(0);
  }

  buildStructure() {
    const customerReviewsContent = document.querySelector('.customer-reviews-section__content');
    const customerImageBlock = tools.createElement('div', '', customerReviewsContent);
    customerImageBlock.className = 'customer-reviews-section__customer-image';
    const customerImage = tools.createElement('img', '', customerImageBlock);
    this.currentCustomerImage = customerImage;
    const customerInfo = document.createElement('div', '', customerReviewsContent);
    customerInfo.className = 'customer-reviews-section__customer-info';
    const customerName = tools.createElement('h4', '', customerInfo);
    customerName.className = 'customer-reviews-section__customer-name';
    this.currentCustomerName = customerName;
    const customerPosition = tools.createElement('h4', '', customerInfo);
    customerPosition.className = 'customer-reviews-section__customer-position';
    this.currentCustomerPosition = customerPosition;
    customerReviewsContent.appendChild(customerInfo);
    const customerPhrase = tools.createElement('p', '', customerReviewsContent);
    customerPhrase.className = 'customer-reviews-section__customer-phrase';
    this.currentCustomerPhrase = customerPhrase;
  }

  buildControl() {
    const customerReviewsRow = document.querySelector('.customer-reviews-section__row');
    const customerReviewsControl = tools.createElement('div', '', customerReviewsRow);
    customerReviewsControl.className = 'customer-reviews-section__control';

    const prevButton = tools.createElement('button', '', customerReviewsControl);
    prevButton.className = 'arrow__prev';

    this.prevButton = prevButton;

    const customerReviewsLen = this.customerReviews.length;
    this.circleButtons = [];
    for (let i = 0; i < customerReviewsLen; i += 1) {
      const btn = tools.createElement('button', '', customerReviewsControl);
      btn.className = 'circle';
      btn.addEventListener('click', () => {
        this.switchTo(i);
      });
      this.circleButtons.push(btn);
    }

    const nextButton = tools.createElement('button', '', customerReviewsControl);
    nextButton.className = 'arrow__next';

    this.nextButton = nextButton;
  }

  switchTo(index) {
    const customer = this.customerReviews[index];
    this.currentCustomerName.innerHTML = customer.name;
    this.currentCustomerPosition.innerHTML = customer.position;
    this.currentCustomerPhrase.innerHTML = customer.phrase;
    this.currentCustomerImage.src = customer.img;

    this.circleButtons.forEach((btn, currentIndex) => {
      if (index === currentIndex) {
        btn.classList.remove('active');
      } else {
        btn.classList.add('active');
      }
    });

    if (index === 0) {
      this.prevButton.classList.remove('active');
    } else {
      this.prevButton.classList.add('active');
      this.prevButton.addEventListener('click', () => {
        this.switchTo(index - 1);
      });
    }

    if (index === this.customerReviews.length - 1) {
      this.nextButton.classList.remove('active');
    } else {
      this.nextButton.classList.add('active');
      this.nextButton.addEventListener('click', () => {
        this.switchTo(index + 1);
      });
    }
  }
}

// eslint-disable-next-line no-unused-vars
const customerReviewGallery = new CustomerReviewGallery(customerReviews);
