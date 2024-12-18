-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "link" TEXT NOT NULL,
    "closed" TIMESTAMP(3),

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "categoryId" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventCategory" (
    "eventId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "EventCategory_pkey" PRIMARY KEY ("eventId","categoryId")
);

-- CreateTable
CREATE TABLE "Geometry" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,
    "magnitudeValue" DOUBLE PRECISION NOT NULL,
    "magnitudeUnit" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Geometry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EventCategory" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_EventCategory_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_EventCategory_B_index" ON "_EventCategory"("B");

-- AddForeignKey
ALTER TABLE "EventCategory" ADD CONSTRAINT "EventCategory_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventCategory" ADD CONSTRAINT "EventCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Geometry" ADD CONSTRAINT "Geometry_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventCategory" ADD CONSTRAINT "_EventCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventCategory" ADD CONSTRAINT "_EventCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
