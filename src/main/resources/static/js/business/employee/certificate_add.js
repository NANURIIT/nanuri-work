/** certificate_add **/
'use strict';

/** onload **/
$(function(){
    getCommonCode();

    // 저장 버튼 클릭
    $(document).on('click', '#save', function(){
        let params = {
            qlfcDsCd : $('#qlfcDsCd').val(), 
            qlfcNm : $('#qlfcNm').val(), 
            pbcplNm : $('#pbcplNm').val(), 
            acqDt : $('#acqDt').val(), 
            vldDt : $('#vldDt').val(), 
            updtDt : $('#updtDt').val()
        }

        registerCertificate(params);
    });
});

var getCommonCode = function(){
    ajaxCall({
        method : 'GET', 
        url : '/employee/getCommonCode', 
        data : {dsCd : 'certificate'}, 
        success : function(object){
            let COMMON_CODE_HTML = '';
            for(let i = 0; i < object.length; i++){
                let tmpRow = object[i];
                COMMON_CODE_HTML += '<option value="'+tmpRow.dtlCd+'">'+tmpRow.dtlCnm+'</option>'
            }

            $('#qlfcDsCd').html(COMMON_CODE_HTML);
        }
    });
}

var registerCertificate = function(params){
    console.log(params);
    console.log(params.updtDt);
    if(isEmpty(params.qlfcNm)){
        openPopup({
            title : '실패', 
            text : '자격증명을 입력해주세요.', 
            type : 'error', 
            callback : function(){
                $(document).on('click', '.confirm', function () {
                    $('#qlfcNm').focus();
                });
            }
        });
    } else if(isEmpty(params.pbcplNm)){
        openPopup({
            title : '실패', 
            text : '발행처를 입력해주세요.', 
            type : 'error', 
            callback : function(){
                $(document).on('click', '.confirm', function () {
                    $('#pbcplNm').focus();
                });
            }
        });
    } else if(isEmpty(params.acqDt) || dateValidation(params.acqDt) == false){
        openPopup({
            title : '실패', 
            text : '취득일자를 확인해주세요.', 
            type : 'error', 
            callback : function(){
                $(document).on('click', '.confirm', function () {
                    $('#acqDt').focus();
                });
            }
        });
    } else if(isEmpty(params.vldDt) || dateValidation(params.vldDt) == false){
        openPopup({
            title : '실패', 
            text : '유효일자를 확인해주세요.', 
            type : 'error', 
            callback : function(){
                $(document).on('click', '.confirm', function () {
                    $('#vldDt').focus();
                });
            }
        });
    } else if(isEmpty(params.updtDt) == false && dateValidation(params.updtDt) == false){
        openPopup({
            title : '실패', 
            text : '갱신일자를 확인해주세요.', 
            type : 'error', 
            callback : function(){
                $(document).on('click', '.confirm', function () {
                    $('#updtDt').focus();
                });
            }
        });
    } else {
        ajaxCall({
            method : 'POST', 
            url : '/employee/certificateWrite', 
            data : params, 
            success : openPopup({
                title : '성공', 
                text : '자격증 등록에 성공했습니다.', 
                type : 'success', 
                callback : function(){
                    location.href = '/employee/index';
                }
            })
        });
    }
}

/**
 * 날짜 유효성 검사
 * @param {string} date 날짜
 * @return {boolean} 유효성 검사 결과
 */
var dateValidation = function(date){
    if(isEmpty(date)){
        return false;
    } else if(isNaN(date)){
        return false;
    } else if(date.length > 8){
        return false;
    } else if(date < 0){
        return false;
    } else if(date.substring(4, 6) < 0 || date.substring(4, 6) > 12){
        return false;
    } else if(date.substring(6, 8) < 0 || date.substring(6, 8) > 31){
        return false;
    }
}