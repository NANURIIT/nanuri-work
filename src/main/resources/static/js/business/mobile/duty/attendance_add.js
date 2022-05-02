/** attendance_add **/
'use strict';

/** onload **/
$(function(){
    getCommonCode();
    getDutyDetail();

    /* start 근태유형에 따라 사유 input box 추가 & 버튼 형태 변경 */ 
    $(document).on('change', '#dutyTypeList', function(){
        let BUTTON_HTML = '';
        if($(this).find('option:selected').attr('class') == 'ON_DUTY'){
            if(isEmpty(param.edDt) && isEmpty(param.edTm)){
                BUTTON_HTML += '<button class="save_button" id="leaveWork">퇴근</button>';
                BUTTON_HTML += '<button class="cancel_button">취소</button>';    
            } else {
                BUTTON_HTML += '<button class="save_button" id="attendance">출근</button>';    
                BUTTON_HTML += '<button class="cancel_button">취소</button>';
            }
            $('#reason').remove();
            $('.button_box').html(BUTTON_HTML);

        } else if($(this).find('option:selected').attr('class') == 'OFF_DUTY'){
            let REASON_HTML = '';
            
            REASON_HTML += '<div id="reason" class="form_box">';
            REASON_HTML += '    <div class="form_title">사유</div>';
            REASON_HTML += '    <div>';
            REASON_HTML += '        <input class="input_box" id="rsnTxt" type="text"  placeholder="사유 입력">';
            REASON_HTML += '    </div>';
            REASON_HTML += '</div>';

            BUTTON_HTML += '<button class="save_button" id="confirm">상신</button>';
            BUTTON_HTML += '<button class="cancel_button">취소</button>';

            if(isEmpty($('#reason'))){
                $('.wrap > form > :nth-child(2)').after(REASON_HTML);
            }

            $('.button_box').html(BUTTON_HTML);
        }
    });
    /* end 근태유형에 따라 사유 input box 추가 & 버튼 형태 변경 */ 

    /* start 시작일시, 종료일시를 현재시간으로 세팅 */ 
    let date = new Date();
    let today = date.getFullYear() + '-' + (date.getMonth() + 1 < 10 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate());
    let time = date.getHours() + ':' + (date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes());

    $('#stDt').val(today);
    $('#edDt').val(today);
    $('#stTm').val(time);
    $('#edTm').val(time);
    /* end 시작일시, 종료일시를 현재시간으로 세팅 */ 

    // 출근버튼 클릭
    $(document).on('click', '#attendance', function(){
        let date = new Date();
        let today = date.getFullYear() + '-' + (date.getMonth() + 1 < 10 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1)) + '-' + date.getDate();
        let time = date.getHours() + ':' + (date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes());

        let params = {
            svceFormCd : $('#dutyTypeList').val(), 
            svcePrjtTxt : $('#svcePrjtTxt').val(), 
            basDt : $('#stDt').val(),  
            stDt : $('#stDt').val(), 
            stTm : $('#stTm').val(), 
            aawBtnClkDtm : today + ' ' + time
        };

        if($('#dutyTypeList').find('option:selected').val() == 'SECOND_DUTY'){
            params.sbtNum = 0.5;
        }
        
        registerOnDuty(params);
    });

    // 퇴근버튼 클릭
    $(document).on('click', '#leaveWork', function(){
        let date = new Date();
        let today = date.getFullYear() + '-' + (date.getMonth() + 1 < 10 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1)) + '-' + date.getDate();
        let time = date.getHours() + ':' + (date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes());

        let params = {
            svceFormCd : $('#dutyTypeList').val(),
            edDt : $('#edDt').val(), 
            edTm : $('#edTm').val(), 
            ckofBtnClkDtm : today + ' ' + time
        };

        if($('#dutyTypeList').find('option:selected').val() == 'FIRST_DUTY'){
            params.sbtNum = 0.5;
        }

        updateDuty(params);
    });

    // 상신 버튼 클릭
    $(document).on('click', '#confirm', function(){
        let params = {
            svceFormCd : $('#dutyTypeList').val(),
            svcePrjtTxt : $('#svcePrjtTxt').val(), 
            rsnTxt : $('#rsnTxt').val(), 
            stDt : $('#stDt').val(), 
            stTm : $('#stTm').val(), 
            edDt : $('#edDt').val(), 
            edTm : $('#edTm').val()
        }

        if($('#dutyTypeList').find('option:selected').val() == 'OFF_DUTY' || $('#dutyTypeList').find('option:selected').val() == 'DESEASE'){
            params.sbtNum = 1;
        }

        registerOffDuty(params);
    });

    $(document).on('click', '.cancel_button', function(){
        history.go(-1);
    });

});

/**
 * 근태유형 호출
 */
 var getCommonCode = function(){
    ajaxCall({
        method : 'GET', 
        url : '/employee/getCommonCode', 
        data : { dsCd : 'DUTY'}, 
        success : function(object){
            let COMMON_CODE_HTML = '';
            for (let i = 0; i < object.length; i++) {
                let tmpRow = object[i];
                COMMON_CODE_HTML += '<option class="'+tmpRow.dtlDsCd+'" value="' + tmpRow.dtlCd + '">' + tmpRow.dtlCnm + '</option>'
            }
            $('#dutyTypeList').html(COMMON_CODE_HTML);
        }
    });
}

/**
 * 출근버튼 클릭
 * @param {string} params.svceFormCd 근태유형 
 * @param {string} params.svcePrjtTxt 근무프로젝트
 * @param {string} params.stDt 시작일시
 * @param {string} params.stTm 시작시각
 * @param {string} params.aawBtnClkDtm 출근버튼클릭시간
 */
 var registerOnDuty = function(params){
    if(isEmpty(params.svcePrjtTxt)){
        openPopup({
            title : '실패', 
            text : '근무프로젝트를 입력해주세요', 
            type : 'error', 
            callback : function(){
                $(document).on('click', '.confirm', function(){
                    $('#svcePrjtTxt').focus();
                });
            }
        });
    } else if(isEmpty(params.stDt)){
        openPopup({
            title : '실패', 
            text : '시작일자를 입력해주세요', 
            type : 'error', 
            callback : function(){
                $(document).on('click', '.confirm', function(){
                    $('#stDt').focus();
                });
            }
        });
    } else if(isEmpty(params.stTm)){
        openPopup({
            title : '실패', 
            text : '시작시각을 입력해주세요', 
            type : 'error', 
            callback : function(){
                $(document).on('click', '.confirm', function(){
                    $('#stTm').focus();
                });
            }
        });
    } else {
        ajaxCall({
            method : 'POST', 
            url : '/duty/registerOnDuty', 
            data : params, 
            success : function(object){
                if(object){
                    openPopup({
                        title : '성공', 
                        text : '근태 등록을 성공하셨습니다.', 
                        type : 'success', 
                        callback : function(){
                            location.href = '/mobile/dutyList';
                        }
                    });
                } else {
                    openPopup({
                        title : '실패', 
                        text : '금일 출근기록이 있습니다.', 
                        type : 'error'
                    });
                }
            }
        })
    }
}

/**
 * 퇴근버튼 클릭
 * @param {string} params.svceFormCd 근태유형
 * @param {string} params.edDt 종료일자
 * @param {string} params.edTm 종료시각
 * @param {string} params.ckofBtnClkDtm 퇴근버튼클릭시간
 */
 var updateDuty = function(params){
    ajaxCall({
        method : 'PATCH', 
        url : '/duty/updateDuty', 
        data : params, 
        success : function(object){
            if(object){
                openPopup({
                    title : '성공', 
                    text : '근태 등록을 성공하셨습니다.', 
                    type : 'success', 
                    callback : function(){
                        location.href = '/mobile/dutyList';
                    }
                });
            } else {
                openPopup({
                    title : '실패', 
                    text : '출근기록이 없습니다.', 
                    type : 'error'
                });
            }
        }, 
        fail : function(){
            console.log(1);
        }
    })
}

/**
 * 상신버튼 클릭
 * @param {string} params.svceFormCd 근태유형
 * @param {string} params.rsnTxt 사유
 * @param {string} params.stDt 시작일자
 * @param {string} params.stTm 시작시각
 * @param {string} params.edDt 종료일자
 * @param {string} params.edTm 종료시각
 */
 var registerOffDuty = function(params){
    ajaxCall({
        method : 'POST', 
        url : '/duty/registerOffDuty', 
        data : params, 
        success : function(object){
            openPopup({
                title : '성공', 
                text : '근태 등록을 성공하셨습니다.', 
                type : 'success', 
                callback : function(){
                    location.href = '/mobile/dutyList';
                }
            });
        }
    });
}

let param = {};

/**
 * 근태정보 상세 출력
 */
 var getDutyDetail = function(){
    ajaxCall({
        method : 'GET', 
        url : '/duty/getLastDutyDetail', 
        success : function(object){
            param = object;
            let BUTTON_HTML = '';
            if(isEmpty(object) == false){
                if(isEmpty(object.edDt) && isEmpty(object.edTm)){
                    $('#dutyTypeList').val(object.svceFormCd);
                    $('#svcePrjtTxt').val(object.svcePrjtTxt);
                    $('#stDt').val(object.stDt);
                    $('#stTm').val(object.stTm.substring(0, 5));

                    BUTTON_HTML += '<button class="save_button" id="leaveWork">퇴근</button>';
                    BUTTON_HTML += '<button class="cancel_button">취소</button>';
                } else {
                    $('#svcePrjtTxt').val(object.svcePrjtTxt);

                    BUTTON_HTML += '<button class="save_button" id="attendance">출근</button>';
                    BUTTON_HTML += '<button class="cancel_button">취소</button>';
                }
                $('.button_box').html(BUTTON_HTML);
            }
        }
    });
}