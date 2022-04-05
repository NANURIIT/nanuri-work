/** index **/
'use strict';

/** onload **/
$(function () {
    getSchoolCareer();

    $(document).on('click', '.deleteSchoolCareer', function(){
        confirmDelete($(this).attr('id'));
    })
});

/**
 * 학력 호출
 */
var getSchoolCareer = function () {
    ajaxCall({
        method: 'GET',
        url: '/employee/schoolCareerList',
        success: function (object) {
            let SCHOOL_CAREER_HTML = '';
            if(object.length > 0){
                for(let i = 0; i < object.length; i++){
                    let tmpRow = object[i];
                    SCHOOL_CAREER_HTML += '<div class="list_info">';
                    SCHOOL_CAREER_HTML += ' <div class="list_info_title">'+tmpRow.schlNm+'</div>';
                    SCHOOL_CAREER_HTML += ' <div class="list_info_desc">'+addDot(tmpRow.etisYm)+' ~ '+addDot(tmpRow.grduYm)+' 졸업</div>';
                    SCHOOL_CAREER_HTML += ' <div class="list_info_set">';
                    SCHOOL_CAREER_HTML += '     <button onclick="location.href=\'/employee/schoolCareerWrite?seqNo='+tmpRow.seqNo+'\'">수정</button>';
                    SCHOOL_CAREER_HTML += '     <button class="deleteSchoolCareer" id="'+tmpRow.seqNo+'">삭제</button>';
                    SCHOOL_CAREER_HTML += ' </div>';
                    SCHOOL_CAREER_HTML += '</div>';
                }
            }

            $('#schoolCareerList').html(SCHOOL_CAREER_HTML);
        }
    });
}

/**
 * 학력 삭제 확인팝업 함수
 * @param {학력 번호}} seqNo 
 */
var confirmDelete = function(seqNo){
    let params = {seqNo : seqNo};

    openPopup({
        title : '삭제', 
        text : '학력을 삭제하시겠습니까?', 
        type : 'warning', 
        callback : function(){
            $(document).on('click', '.confirm', function(){
                deleteSchoolCareer(params);
            });
        }
    });
}

/**
 * 학력 삭제 함수
 * @param {학력 번호} params.seqNo
 */
var deleteSchoolCareer = function(params){
    ajaxCall({
        method : "DELETE", 
        url : '/employee/schoolCareerDelete', 
        data : params, 
        success : deleteSchoolCareerCB
    });
}

var deleteSchoolCareerCB = function(){
    openPopup({
        title : '성공', 
        text : '삭제완료했습니다.', 
        type : 'success', 
        callback : function(){
            $(document).on('click', '.confirm', function(){
                getSchoolCareer();
            });
        }
    });
}

/**
 * 날짜에 점 찍는 함수
 * @param {날짜} date 
 * @returns 
 */
var addDot = function(date){
    return date.substring(0, 4) + '.' + date.substring(4, date.length);
}