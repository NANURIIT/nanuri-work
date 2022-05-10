/** noticeDetail **/
'use strict';

/** onload **/
$(function () {
    let seqNo = new URL(document.location.href).searchParams.get('seqNo');

    getBoardDetail(seqNo);

    // 수정버튼 클릭
    $(document).on('click', '#modifyBoard', function () {
        location.href = '/admin/noticeWrite?seqNo=' + seqNo;
    });

    // 삭제버튼 클릭
    $(document).on('click', '#deleteBoard', function(){
        confirmDelete(seqNo);
    });
});

/**
 * 게시글 상세내용 호출 함수
 * @param {Number} seqNo 
 */
var getBoardDetail = function (seqNo) {
    ajaxCall({
        method: 'GET',
        url: '/admin/boardDetail/' + seqNo,
        success: function (object) {
            let BOARD_DETAIL_HTML = '';

            BOARD_DETAIL_HTML += '<tr>';
            BOARD_DETAIL_HTML += '  <td class="notice_detail_title">' + object.bultTitlNm + '</td>'         // 제목
            BOARD_DETAIL_HTML += '</tr>';

            BOARD_DETAIL_HTML += '<tr>';
            BOARD_DETAIL_HTML += '  <td class="notice_detail_info">'
            BOARD_DETAIL_HTML += '      <ul>';
            BOARD_DETAIL_HTML += '          <li class="notice_detail_line">' + object.rgmnNm + '</li>';     // 작성자
            BOARD_DETAIL_HTML += '          <li>' + object.rgDtm.substring(0, 11) + '</li>';                // 작성일
            BOARD_DETAIL_HTML += '      </ul>';
            BOARD_DETAIL_HTML += '  </td>';
            BOARD_DETAIL_HTML += '</tr>';
            
            BOARD_DETAIL_HTML += '<tr>';
            BOARD_DETAIL_HTML += '  <td  class="notice_detail_desc">' + object.brcn + '</td>'               // 글 내용
            BOARD_DETAIL_HTML += '</tr>';

            $('.notice_detail > table > tbody').html(BOARD_DETAIL_HTML);
        }
    });
}

/**
 * 게시글 삭제 확인팝업 함수
 * @param {Number} seqNo 게시글 번호
 */
var confirmDelete = function(seqNo){
    openPopup({    
        title : '삭제', 
        text : '정말 삭제하시겠습니까?', 
        type : 'warning', 
        callback : function(){
            $(document).on('click', '.confirm', function(){
                deleteBoard(seqNo)
            });
        }
    });
}

/**
 * 게시글 삭제 함수
 * @param {Number} seqNo 게시글 번호
 */
var deleteBoard = function(seqNo){
    ajaxCall({
        method : 'DELETE', 
        url : '/admin/boardDelete', 
        data : {seqNo : seqNo}, 
        success : deleteBoardCB
    });
}

/**
 * deleteBoard 콜백 함수
 */
var deleteBoardCB = function(){
    openPopup({
        title : '성공', 
        text : '삭제완료했습니다.', 
        type : 'success', 
        callback : function(){
            $(document).on('click', '.confirm', function(){
                history.go(-1);
            });
        }
    });
}