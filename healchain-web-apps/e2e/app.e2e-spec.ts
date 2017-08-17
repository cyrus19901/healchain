import { AngularTestPage } from './app.po';
import { browser, element, by } from 'protractor';

describe('Starting tests for Healchain', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be Healchain', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('Healchain');
    })
  });

  it('navbar-brand should be healchain@0.1.6',() => {
    var navbarBrand = element(by.css('.navbar-brand')).getWebElement();
    expect(navbarBrand.getText()).toBe('healchain@0.1.6');
  });

  
    it('Admit component should be loadable',() => {
      page.navigateTo('/Admit');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('Admit');
    });

    it('Admit table should have 11 columns',() => {
      page.navigateTo('/Admit');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(11); // Addition of 1 for 'Action' column
      });
    });

  
    it('OpConsult component should be loadable',() => {
      page.navigateTo('/OpConsult');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('OpConsult');
    });

    it('OpConsult table should have 8 columns',() => {
      page.navigateTo('/OpConsult');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(8); // Addition of 1 for 'Action' column
      });
    });

  
    it('LabTest component should be loadable',() => {
      page.navigateTo('/LabTest');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('LabTest');
    });

    it('LabTest table should have 8 columns',() => {
      page.navigateTo('/LabTest');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(8); // Addition of 1 for 'Action' column
      });
    });

  
    it('Wearable component should be loadable',() => {
      page.navigateTo('/Wearable');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('Wearable');
    });

    it('Wearable table should have 6 columns',() => {
      page.navigateTo('/Wearable');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(6); // Addition of 1 for 'Action' column
      });
    });

  
    it('Prescription component should be loadable',() => {
      page.navigateTo('/Prescription');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('Prescription');
    });

    it('Prescription table should have 9 columns',() => {
      page.navigateTo('/Prescription');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(9); // Addition of 1 for 'Action' column
      });
    });

  

});
