-- DELETE FROM sale_receipt sr
-- WHERE sr.id = 'd303bace-754a-4072-8874-6a7ce9d131e5';
--
-- DELETE FROM sale_receipt_include sri
-- WHERE sri.salereceiptid = 'd303bace-754a-4072-8874-6a7ce9d131e5';
-- SELECT COUNT(sr.id) as countId FROM sale_receipt sr;


CREATE OR REPLACE FUNCTION getTotalPrice(receiptId uuid) RETURNS DECIMAL(10, 2)
AS
$$
BEGIN
    return (select SUM(price * amount) as totalPrice
            from (select salereceiptid, bookid, price, amount
                  from book
                           natural join sale_receipt_include sri) as bl
            where bl.salereceiptid = receiptId);
END;
$$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION getAllSaleReceipts()
--     RETURNS TABLE(
--         id  uuid,
--         createDate  timestamp,
--         cashier VARCHAR(255),
--         total	DECIMAL(10,2)
--     )
-- AS $$
-- BEGIN
--     return QUERY SELECT sr.id,
--        					sr.createddate,
--        					(SELECT employeename
--                    		FROM Employee as e
--                    		WHERE e.employeeid = sr.CreatedEmployeeId) as cashier,
--         				(SELECT getTotalPrice(sr.id)) as total
-- 				FROM Sale_receipt as sr;
-- END;
-- $$ LANGUAGE plpgsql;

CREATE OR REPLACE function listBookFromReceipt(receiptId uuid)
    RETURNS TABLE
            (
                bookName  VARCHAR(150),
                isbn      BIGINT,
                unitPrice DECIMAL(10, 2),
                quantity  INT
            )
AS
$$
BEGIN
    RETURN QUERY
        SELECT c.name, c.isbn, c.price AS unitPrice, c.amount AS quantity
        FROM (sale_receipt_include sri NATURAL JOIN book b) as c
        WHERE salereceiptid = receiptId;
END;
$$ LANGUAGE plpgsql;

-- select * from listbookfromreceipt('d303bace-754a-4072-8874-6a7ce9d131e6');

-- DROP FUNCTION getReceiptById(VARCHAR(255));

create function get_sale_receipt_by_id(_id uuid)
    returns TABLE
            (
                id                uuid,
                createddate       timestamp,
                createdemployeeid integer,
                price             DECIMAL(10, 2)
            )
    language plpgsql
as
$$
BEGIN
    RETURN QUERY
        SELECT *
        FROM Sale_receipt
        WHERE sale_receipt.id = _id;
END;
$$;

create function get_import_receipt_by_id(_id uuid)
    returns TABLE
            (
                id                uuid,
                createddate       timestamp,
                createdemployeeid integer,
                price             DECIMAL(10, 2)
            )
    language plpgsql
as
$$
BEGIN
    RETURN QUERY
        SELECT *
        FROM import_receipt
        WHERE import_receipt.id = _id;
END;
$$;



CREATE OR REPLACE FUNCTION getBookInReceipt(receiptId VARCHAR(255))
    RETURNS TABLE
            (
                bid      BIGINT,
                quantity INT
            )
AS
$$
BEGIN
    RETURN QUERY
        SELECT bookId as id, amount
        FROM Sale_receipt_Include
        WHERE salereceiptid = CAST(receiptId as uuid)
        ORDER BY bookId;
END;
$$ LANGUAGE plpgsql;

-- select * from getbookinreceipt('d303bace-754a-4072-8874-6a7ce9d131e6'); 
