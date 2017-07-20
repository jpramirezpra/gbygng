CREATE TABLE [dbo].[Samples]
(
	[SampleId] INT NOT NULL PRIMARY KEY, 
    [Barcode] VARCHAR(MAX) NOT NULL, 
    [CreatedAt] DATETIME NOT NULL, 
    [CreatedBy] INT NOT NULL, 
    [StatusId] INT NOT NULL
)
