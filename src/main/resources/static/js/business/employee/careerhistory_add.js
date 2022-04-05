/** careerhistory_add **/
'use strict';

/** onload **/
$(function(){

    let seqNo = new URL(document.location.href).searchParams.get('seqNo'); // seqNo세팅
    let mode = seqNo != null ? 'M' : 'W';                                  // 작성인지 수정인지 모드 설정
    
    getCommonCode();
    
    if (mode == 'M') {
        getCareerhistoryDetail(seqNo);
    }

    $(document).on('click', '#save', function(){
        let params = {
            bzNm : $('#bzNm').val(),
            bzStYm : $('#bzStYm').val(),
            bzEdYm : $('#bzEdYm').val(),
            ordrNm : $('#ordrNm').val(),
            bzCntn : $('#bzCntn').val(),
            blgCoNm : $('#blgCoNm').val(),
            rolCd : $('#rolCd').val(),
            chrgBsnNm : $('#chrgBsnNm').val(),
            langNm : $('#langNm').val(),
            dbNm : $('#dbNm').val(),
            osNm : $('#osNm').val(),
            useFrmwkNm : $('#useFrmwkNm').val(),
            mthNm : $('#mthNm').val(),
            etcCapaNm : $('#etcCapaNm').val()
        }

        if (mode == 'W') {
            registerCareerhistory(params);
        } else if (mode == 'M') {
            params.seqNo = seqNo;
            registerCareerhistory(params);
        }  
    });
});

var getCommonCode = function(){
    ajaxCall({
        method : 'GET', 
        url : '/employee/getCommonCode', 
        data : {dsCd : 'role'}, 
        success : function(object){
            let COMMON_CODE_HTML = '';
            for(let i = 0; i < object.length; i++){
                let tmpRow = object[i];
                COMMON_CODE_HTML += '<option value="'+tmpRow.dtlCd+'">'+tmpRow.dtlCnm+'</option>';
            }

            $('#rolCd').html(COMMON_CODE_HTML);
        }
    })
}

/**
 * 경력이력 입력 함수
 * @param {string} params.bzNm 사업명
 * @param {string} params.bzStYm 사업시작년월
 * @param {string} params.bzEdYm 사업종료년월
 * @param {string} params.ordrNm 발주사
 * @param {string} params.bzCntn 사업내용           
 * @param {string} params.blgCoNm 소속회사
 * @param {string} params.rolCd 역할
 * @param {string} params.chrgBsnNm 담당업무
 * @param {string} params.langNm 사용언어
 * @param {string} params.dbNm 사용DB
 * @param {string} params.osNm 사용OS
 * @param {string} params.useFrmwkNm 사용프레임워크
 * @param {string} params.mthNm 사용방법론
 * @param {string} params.etcCapaNm 사용기타
 */
var registerCareerhistory = function(params){
    if(isEmpty(params.bzNm)){
        openPopup({
            title: '실패',
            text: '사업명을 입력해주세요.',
            type: 'error',
            callback: function () {
                $(document).on('click', '.confirm', function () {
                    $('#bzNm').focus();
                });
            }
        });
    } else if(dateValidation(params.bzStYm) == false){
        openPopup({
            title: '실패',
            text: '사업시작년월을 확인해주세요.',
            type: 'error',
            callback: function () {
                $(document).on('click', '.confirm', function () {
                    $('#bzStYm').focus();
                });
            }
        });
    } else if(dateValidation(params.bzEdYm) == false){
        openPopup({
            title: '실패',
            text: '사업종료년월을 확인해주세요.',
            type: 'error',
            callback: function () {
                $(document).on('click', '.confirm', function () {
                    $('#bzEdYm').focus();
                });
            }
        });
    } else if(isEmpty(params.ordrNm)){
        openPopup({
            title: '실패',
            text: '발주사를 입력해주세요.',
            type: 'error',
            callback: function () {
                $(document).on('click', '.confirm', function () {
                    $('#ordrNm').focus();
                });
            }
        });
    } else if(isEmpty(params.bzCntn)){
        openPopup({
            title: '실패',
            text: '사업내용을 입력해주세요.',
            type: 'error',
            callback: function () {
                $(document).on('click', '.confirm', function () {
                    $('#bzCntn').focus();
                });
            }
        });
    } else if(isEmpty(params.blgCoNm)){
        openPopup({
            title: '실패',
            text: '소속회사를 입력해주세요.',
            type: 'error',
            callback: function () {
                $(document).on('click', '.confirm', function () {
                    $('#blgCoNm').focus();
                });
            }
        });
    } else if(isEmpty(params.rolCd)){
        openPopup({
            title: '실패',
            text: '역할을 입력해주세요.',
            type: 'error',
            callback: function () {
                $(document).on('click', '.confirm', function () {
                    $('#rolCd').focus();
                });
            }
        });
    } else if(isEmpty(params.chrgBsnNm)){
        openPopup({
            title: '실패',
            text: '담당업무를 입력해주세요.',
            type: 'error',
            callback: function () {
                $(document).on('click', '.confirm', function () {
                    $('#chrgBsnNm').focus();
                });
            }
        });
    } else if(isEmpty(params.langNm)){
        openPopup({
            title: '실패',
            text: '사용언어를 입력해주세요.',
            type: 'error',
            callback: function () {
                $(document).on('click', '.confirm', function () {
                    $('#langNm').focus();
                });
            }
        });
    } else if(isEmpty(params.dbNm)){
        openPopup({
            title: '실패',
            text: '사용DB를 입력해주세요.',
            type: 'error',
            callback: function () {
                $(document).on('click', '.confirm', function () {
                    $('#dbNm').focus();
                });
            }
        });
    } else if(isEmpty(params.osNm)){
        openPopup({
            title: '실패',
            text: '사용OS를 입력해주세요.',
            type: 'error',
            callback: function () {
                $(document).on('click', '.confirm', function () {
                    $('#osNm').focus();
                });
            }
        });
    } else if(isEmpty(params.useFrmwkNm)){
        openPopup({
            title: '실패',
            text: '사용프레임워크를 입력해주세요.',
            type: 'error',
            callback: function () {
                $(document).on('click', '.confirm', function () {
                    $('#useFrmwkNm').focus();
                });
            }
        });
    } else if(isEmpty(params.mthNm)){
        openPopup({
            title: '실패',
            text: '사용방법론을 입력해주세요.',
            type: 'error',
            callback: function () {
                $(document).on('click', '.confirm', function () {
                    $('#mthNm').focus();
                });
            }
        });
    } else {
        ajaxCall({
            method : 'POST', 
            url : '/employee/careerhistoryWrite', 
            data : params, 
            success: openPopup({
                title: '성공',
                text: '프로젝트이력 등록에 성공했습니다.',
                type: 'success',
                callback: function () {
                    location.href = '/employee/index';
                }
            })
        });
    }
}

var getCareerhistoryDetail = function(seqNo){
    ajaxCall({
        method : 'GET', 
        url : '/employee/careerhistoryDetail/'+seqNo, 
        success : function(object){
            $('#bzNm').val(object.bzNm);
            $('#bzStYm').val(object.bzStYm);
            $('#bzEdYm').val(object.bzEdYm);
            $('#ordrNm').val(object.ordrNm);
            $('#bzCntn').val(object.bzCntn);
            $('#blgCoNm').val(object.blgCoNm);
            $('#rolCd').val(object.rolCd);
            $('#chrgBsnNm').val(object.chrgBsnNm);
            $('#langNm').val(object.langNm);
            $('#dbNm').val(object.dbNm);
            $('#osNm').val(object.osNm);
            $('#useFrmwkNm').val(object.useFrmwkNm);
            $('#mthNm').val(object.mthNm);
            $('#etcCapaNm').val(object.etcCapaNm);
        }
    });
}

/**
 * 날짜 유효성 검사
 * @param {string} date 날짜
 * @returns {boolean} 유효성 검사 결과
 */
 var dateValidation = function (date) {
    if (isEmpty(date)) {
        return false;
    } else if (isNaN(date)) {
        return false;
    } else if (date.length > 6) {
        return false;
    } else if (date < 0) {
        return false;
    } else if (date.substring(4, date.length) < 0 || date.substring(4, date.length) > 12) {
        return false;
    }
}