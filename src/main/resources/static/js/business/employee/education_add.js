/** education_add **/
'use strict';

/** onload **/
$(function () {

    let seqNo = new URL(document.location.href).searchParams.get('seqNo'); // seqNo세팅
    let mode = seqNo != null ? 'M' : 'W';                                  // 작성인지 수정인지 모드 설정

    getCommonCode();

    if(mode == 'M'){
        getSchoolCareerDetail(seqNo);
    }

    $(document).on('click', '#save', function () {
        let params = {
            sccaDsCd : $('#sccaDsCd').val(), 
            majrNm : $('#majrNm').val(), 
            schlNm : $('#schlNm').val(), 
            etisYm : $('#etisYm').val(), 
            grduYm : $('#grduYm').val()
        };

        if(mode == 'W'){   
            registerSchoolCareer(params);
        } else if(mode == 'M'){
            params.seqNo = seqNo;
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

    if (isEmpty(params.schlNm)) {
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
    } else if (dateInvalidation(params.etisYm) == false) {
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
    } else if (dateInvalidation(params.grduYm) == false) {
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
    } else if(params.sccaDsCd != 'highSchool' && isEmpty(params.majrNm)){
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
}

var getSchoolCareerDetail = function(seqNo){
    ajaxCall({
        method : 'GET', 
        url : '/employee/schoolCareerDetail/' + seqNo, 
        success : function(object){
            $('#sccaDsCd').val(object.sccaDsCd);
            $('#schlNm').val(object.schlNm);
            $('#etisYm').val(object.etisYm);
            $('#grduYm').val(object.grduYm);
            $('#majrNm').val(object.majrNm);
        }
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