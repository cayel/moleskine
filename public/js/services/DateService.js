// public/js/services/DateService.js
angular.module('DateService', []).factory('DateService', function() {

  return {
    getDateNow : function () {
      return (new Date());
    },
    getYearList : function () {
      return ([
        {YearId : 2005, YearName : '2005' },       
        {YearId : 2006, YearName : '2006' },       
        {YearId : 2007, YearName : '2007' },       
        {YearId : 2008, YearName : '2008' },       
        {YearId : 2009, YearName : '2009' },       
        {YearId : 2010, YearName : '2010' },       
        {YearId : 2011, YearName : '2011' },       
        {YearId : 2012, YearName : '2012' },       
        {YearId : 2013, YearName : '2013' },       
        {YearId : 2014, YearName : '2014' },       
        {YearId : 2015, YearName : '2015' },       
        {YearId : 2016, YearName : '2016' },       
        {YearId : 2017, YearName : '2017' },       
        {YearId : 2018, YearName : '2018' },       
        {YearId : 2019, YearName : '2019' },       
        {YearId : 2020, YearName : '2020' }]
        )
    },
    getMonthList : function () {
      return ([
        {MonthId : 1, MonthName : 'Janvier' },       
        {MonthId : 2, MonthName : 'Février' },       
        {MonthId : 3, MonthName : 'Mars' },       
        {MonthId : 4, MonthName : 'Avril' },       
        {MonthId : 5, MonthName : 'Mai' },       
        {MonthId : 6, MonthName : 'Juin' },       
        {MonthId : 7, MonthName : 'Juillet' },       
        {MonthId : 8, MonthName : 'Août' },       
        {MonthId : 9, MonthName : 'Septembre' },       
        {MonthId : 10, MonthName : 'Octobre' },       
        {MonthId : 11, MonthName : 'Novembre' },       
        {MonthId : 12, MonthName : 'Décembre' }]
        )
    }
  }
});
