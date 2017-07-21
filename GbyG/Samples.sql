CREATE TABLE [dbo].[Samples]
(
	[SampleId] INT NOT NULL PRIMARY KEY, 
    [Barcode] VARCHAR(50) NULL, 
    [CreatedAt] DATETIME NOT NULL DEFAULT GETDATE(),
    [CreatedBy] INT NULL, 
    [StatusId] INT NULL, 
    CONSTRAINT [FK_Samples_ToStatus] FOREIGN KEY ([StatusId]) REFERENCES [Statuses]([StatusId]), 
    CONSTRAINT [FK_Samples_ToUser] FOREIGN KEY ([CreatedBy]) REFERENCES [Users]([UserId])	
)
