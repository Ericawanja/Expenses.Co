create table expenses(
    id varchar(100) primary key,
    projectId varchar(100) FOREIGN key (projectId) REFERENCES projects(id),
    expenseTitle varchar(150),
    expenseDescription varchar(400),
    amount  Money,
   	isDeleted Bit default 0
)
