/** education_add **/
'use strict';

/** onload **/
$(function () {
    getCommonCode();

    $(document).on('click', '#save', function () {
        let params = {
            sccaDsCd : $('#sccaDsCd').val(), 
            majrNm : $('#majrNm').val(), 
            schlNm : $('#schlNm').val(), 
            etisYm : $('#etisYm').val(), 
            grduYm : $('#grduYm').val()
        };
        
        if (isEmpty($('#schlNm').val())) {
            openPopup({
                title: '실패',
                text: '학교명을 입력해주세요.',
                type: 'error',
                callback: function () {
                    $(document).on('click', '.confirm', function () {
                        $('#schoolName').focus();
                    });
                }
            });
        } else if (dateInvalidation($('#etisYm').val()) == false) {
            openPopup({
                title: '실패',
                text: '입학년월을 확인해주세요.',
                type: 'error',
                callback: function () {
                    $(document).on('click', '.confirm', function () {
                        $('#etisYm').focus();
                    });
                }
            });
        } else if (dateInvalidation($('#grduYm').val()) == false) {
            openPopup({
                title: '실패',
                text: '졸업년월을 확인해주세요.',
                type: 'error',
                callback: function () {
                    $(document).on('click', '.confirm', function () {
                        $('#grduYm').focus();
                    });
                }
            });
        } else if($('#sccaDsCd').val() != 'highSchool' && isEmpty($('#majrNm').val())){
            openPopup({
                title: '실패',
                text: '전공을 입력해주세요.',
                type: 'error',
                callback: function () {
                    $(document).on('click', '.confirm', function () {
                        $('#majrNm').focus();
                    });
                }
            });
        } else {
            registerSchoolCareer(params);
        }
    });
});

var getCommonCode = function () {
    ajaxCall({
        method: 'GET',
        url: '/employee/getCommonCode',
        data: { dsCd: 'schoolCareer' },
        success: function (object) {
            let COMMON_CODE_HTML = '';
            for (let i = 0; i < object.length; i++) {
                COMMON_CODE_HTML += '<option value="' + object[i].dtlCd + '">' + object[i].dtlCnm + '</option>'
            }
            $('#sccaDsCd').html(COMMON_CODE_HTML);
        }
    });
}

var registerSchoolCareer = function(params){
    ajaxCall({
        method : 'POST', 
        url : '/employee/schoolCareerWrite', 
        data : params, 
        success : openPopup({
            title : '성공', 
            text : '학력 등록에 성공했습니다.', 
            type : 'success', 
            callback : function(){
                location.href = '/employee/index';
            }
        })
    });
}

var dateInvalidation = function (date) {
    if (isEmpty(date)) {
        return false;
    }else if(isNaN(date)){
        return false;
    } else if(date.length > 6){
        return false;
    } else if (date < 0) {
        return false;
    } else if (date.substring(4, date.length) < 0 || date.substring(4, date.length) > 12) {
        return false;
    }
}