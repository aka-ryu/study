<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ include file="../includes/header.jsp"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>

	<div class="row">
		<div class="col-log-12">
			<h1 class="page-header">Board Register</h1>
		</div>
	</div>

	<div class="row">
		<div class="col-lg-12">
			<div class="panel panel-default">

				<div class="panel-heading">Board Register</div>

				<div class="panel-body">


					<div class="form-group">
						<label>Bno</label> <input class="form-control" name='bno'
							value='<c:out value="${board.bno}"/>' readonly="readonly">
					</div>
					<div class="form-group">
						<label>Title</label> <input class="form-control" name='title'
							value='<c:out value="${board.title}"/>' readonly="readonly">
					</div>

					<div class="form-group">
						<label>Text area</label>
						<textarea class="form-control" rows="3" name='content'
							readonly="readonly"><c:out value="${board.content }" /></textarea>
					</div>

					<div class="form-group">
						<label>Writer> <input class="form-control" name='writer'
							value='<c:out value="${board.writer}"/>' readonly="readonly">
					</div>

					<button data-oper='modify' class="btn btn-default">Modify</button>

					<button data-oper='list' class="btn btn-info">List</button>

					<form id='operForm' action="/board/modify" method="get">
						<input type='hidden' id='bno' name='bno' value='<c:out value="${board.bno}"/>'>
						<input type='hidden' name='pageNum' value='<c:out value="${cri.pageNum}"/>'>
						<input type='hidden' name='amount' value='<c:out value="${cri.amount}"/>'>
						<input type='hidden' name='keyword' value='<c:out value="${cri.keyword}"/>'>
						<input type='hidden' name='type' value='<c:out value="${cri.type}"/>'>
					</form>
					
					<script type="text/javascript" src="/resources/js/reply.js"></script>
					
					<script type="text/javascript">
						
						console.log("==============");
						console.log("JS TEST");
						
						var bnoValue = '<c:out value="${board.bno}"/>';
						
						replyService.add(
							{reply:"JS TEST", replyer:"tester", bno:bnoValue},
							function(result){
								alert("RESULT: " + result);
							}
						);
						
						
						replyService.getList({bno:bnoValue, page:1}, function(list){
							
							for(var i = 0, len = list.length||0; i < len; i++) {
								console.log(list[i]);
							}
						});
						
						
						replyService.remove(1, function(count) {
							console.log(count);
							
							if (count === "success") {
								alert("REMOVED");
							}
						}, function(err) {
							alert('ERROR...');
						});
						
					</script>
					
					<script type="text/javascript">
						$(document).ready(function() {
							var operForm = $("#operForm");
							
							$("button[data-oper='modify']").on("click", function(e){
								operForm.attr("action","/board/modify").submit();
							});
							
							$("button[data-oper='list']").on("click", function(e){
								operForm.find("#bno").remove();
								operForm.attr("action","/board/list")
								operForm.submit();
							});
						});
					</script>
				</div>
			</div>
		</div>
	</div>

	<%@ include file="../includes/footer.jsp"%>
</body>
</html>