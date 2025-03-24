import * as cdk from 'aws-cdk-lib';
import { AttributeType, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class GstoreDBStack extends cdk.Stack {


  public readonly UserTable: Table
  public readonly SubCategoryTable : Table
  public readonly CategoryTable : Table
  public readonly ProductTable : Table
  public readonly OrderTable :  Table
  public readonly OrderHistoryTable : Table
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {

    super(scope, id, props);


    this.UserTable = new Table(this, "userTable" , {
      tableName : "UserTable",
      partitionKey : {
        name :"email",
        type : AttributeType.STRING
      },
      sortKey : {
        name : "userId",
        type : AttributeType.NUMBER
        
      },
      removalPolicy : cdk.RemovalPolicy.RETAIN
    })

    this.SubCategoryTable = new Table(this, "subCategoryTable" , {
      tableName : "SubCategoryTable",
      partitionKey : {
        name :"subcategoryId",
        type : AttributeType.NUMBER
      },
      sortKey : {
        name : "subcategoryName",
        type : AttributeType.STRING
        
      },
      removalPolicy : cdk.RemovalPolicy.RETAIN
    })

    this.CategoryTable = new Table(this, "categoryTable" , {
      tableName : "CategoryTable",
      partitionKey : {
        name :"categoryId",
        type : AttributeType.NUMBER
      },
      sortKey : {
        name : "categoryName",
        type : AttributeType.STRING
        
      },
      removalPolicy : cdk.RemovalPolicy.RETAIN
    })
    this.ProductTable = new Table(this, "productTable" , {
      tableName : "ProductTable",
      partitionKey : {
        name :"productId",
        type : AttributeType.NUMBER
      },
      sortKey : {
        name : "productName",
        type : AttributeType.STRING
        
      },
      removalPolicy : cdk.RemovalPolicy.RETAIN
    })
    this.OrderTable = new Table(this, "orderTable" , {
      tableName : "OrderTable",
      partitionKey : {
        name :"orderId",
        type : AttributeType.NUMBER
      },
      sortKey : {
        name : "userId",
        type : AttributeType.NUMBER
        
      },
      removalPolicy : cdk.RemovalPolicy.RETAIN
    })
    this.OrderHistoryTable = new Table(this, "orderHistoryTable" , {
      tableName : "OrderHistoryTable",
      partitionKey : {
        name :"orderId",
        type : AttributeType.NUMBER
      },
      sortKey : {
        name : "userId",
        type : AttributeType.NUMBER
        
      },
      removalPolicy : cdk.RemovalPolicy.RETAIN
    })



    
  }
}
