CREATE
OR ALTER procedure [dbo].[markProjectAsPaid] (@projectId varchar(100)) AS BEGIN
update
    projects
set
    isPaid = 1
where
    Id = @projectId
END