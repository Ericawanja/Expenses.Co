create table expenses(
    id varchar(100) primary key,
    projectId varchar(100) FOREIGN key (id) REFERENCES projects,
    expenditure Money,
    Budget Money,
    isPaid Bit default 0,
	isDeleted Bit default 0
)

